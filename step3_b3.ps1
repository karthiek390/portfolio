& (Get-Content graphify-out\.graphify_python) -c "
import json, glob
from pathlib import Path

chunks = sorted(glob.glob('graphify-out/.graphify_chunk_*.json'))
all_nodes, all_edges, all_hyperedges = [], [], []
total_in, total_out = 0, 0
for c in chunks:
    try:
        d = json.loads(Path(c).read_text(encoding='utf-8-sig'))
    except Exception as e:
        print(f'Error reading {c}: {e}')
        continue
    all_nodes += d.get('nodes', [])
    all_edges += d.get('edges', [])
    all_hyperedges += d.get('hyperedges', [])
    total_in += d.get('input_tokens', 0)
    total_out += d.get('output_tokens', 0)
Path('graphify-out/.graphify_semantic_new.json').write_text(json.dumps({
    'nodes': all_nodes, 'edges': all_edges, 'hyperedges': all_hyperedges,
    'input_tokens': total_in, 'output_tokens': total_out,
}, indent=2, ensure_ascii=False), encoding='utf-8')
print(f'Merged {len(chunks)} chunks: {total_in:,} in / {total_out:,} out tokens')
"

@'
import json
from graphify.cache import save_semantic_cache
from pathlib import Path

new = json.loads(Path('graphify-out/.graphify_semantic_new.json').read_text(encoding="utf-8-sig")) if Path('graphify-out/.graphify_semantic_new.json').exists() else {'nodes':[],'edges':[],'hyperedges':[]}
saved = save_semantic_cache(new.get('nodes', []), new.get('edges', []), new.get('hyperedges', []))
print(f'Cached {saved} files')
'@ | Out-File -FilePath graphify-out\.graphify_step_3_extract_entities_and_relations_6.py -Encoding utf8
& (Get-Content graphify-out\.graphify_python) graphify-out\.graphify_step_3_extract_entities_and_relations_6.py
Remove-Item -ErrorAction SilentlyContinue graphify-out\.graphify_step_3_extract_entities_and_relations_6.py

@'
import json
from pathlib import Path

cached = json.loads(Path('graphify-out/.graphify_cached.json').read_text(encoding="utf-8-sig")) if Path('graphify-out/.graphify_cached.json').exists() else {'nodes':[],'edges':[],'hyperedges':[]}
new = json.loads(Path('graphify-out/.graphify_semantic_new.json').read_text(encoding="utf-8-sig")) if Path('graphify-out/.graphify_semantic_new.json').exists() else {'nodes':[],'edges':[],'hyperedges':[]}

all_nodes = cached['nodes'] + new.get('nodes', [])
all_edges = cached['edges'] + new.get('edges', [])
all_hyperedges = cached.get('hyperedges', []) + new.get('hyperedges', [])
seen = set()
deduped = []
for n in all_nodes:
    if n['id'] not in seen:
        seen.add(n['id'])
        deduped.append(n)

merged = {
    'nodes': deduped,
    'edges': all_edges,
    'hyperedges': all_hyperedges,
    'input_tokens': new.get('input_tokens', 0),
    'output_tokens': new.get('output_tokens', 0),
}
Path('graphify-out/.graphify_semantic.json').write_text(json.dumps(merged, indent=2, ensure_ascii=False), encoding="utf-8")
print(f'Extraction complete - {len(deduped)} nodes, {len(all_edges)} edges ({len(cached["nodes"])} from cache, {len(new.get("nodes",[]))} new)')
'@ | Out-File -FilePath graphify-out\.graphify_step_3_extract_entities_and_relations_7.py -Encoding utf8
& (Get-Content graphify-out\.graphify_python) graphify-out\.graphify_step_3_extract_entities_and_relations_7.py
Remove-Item -ErrorAction SilentlyContinue graphify-out\.graphify_step_3_extract_entities_and_relations_7.py

Remove-Item -ErrorAction SilentlyContinue graphify-out\.graphify_cached.json, graphify-out\.graphify_uncached.txt, graphify-out\.graphify_semantic_new.json
