import json
from collections import defaultdict

COLOURS = [
  "#e11d21",
  "#fbca04",
  "#009800",
  "#006b75",
  "#207de5",
  "#0052cc",
  "#5319e7",
  "#f7c6c7",
  "#fad8c7",
  "#fef2c0",
  "#bfe5bf",
  "#c7def8",
  "#bfdadc",
  "#bfd4f2",
  "#d4c5f9",
  "#cccccc",
  "#84b6eb",
  "#e6e6e6",
  "#ffffff",
  "#cc317c",
]



def main(argv):
  file = argv[1]

  with open(file, encoding="utf8") as fp:

    nodes = []
    edges = []
    reserve = []
    branchIndex = 0
    branches = defaultdict(lambda : None)

    def getBranch(sha):
      nonlocal branchIndex
      nonlocal reserve
      nonlocal branches

      if branches[sha] is None:
        branches[sha] = branchIndex
        reserve.append(branchIndex)
        branchIndex += 1
      
      return branches[sha]

    for index, line in enumerate(fp):
      split = line.split("|")

      sha, parents, desc, message = split[0], [ i for i in split[1].split(" ") if len(i) > 0],  split[2], '|'.join(split[3:]).strip()
      
      branch = getBranch(sha)
      numParents = len(parents)
      offset = reserve.index(branch)

      routes = []

      if numParents == 1:
        if branches[parents[0]] is not None:
          # create branch
          for i, b in enumerate(reserve[offset + 1:]):
            routes.append([i + offset + 1, i + offset, b])
          for i, b in enumerate(reserve[:offset]):
            routes.append([i, i, b])
          reserve.remove(branch)
          routes.append([offset, reserve.index(branches[parents[0]]), branch])
        else:
          # straight
          for i, b in enumerate(reserve):
            routes.append([i, i, b])
          branches[parents[0]] = branch
      elif numParents == 2:
        # merge
        branches[parents[0]] = branch
        for i, b in enumerate(reserve):
          routes.append([i, i, b])
        otherBranch = getBranch(parents[1])
        routes.append([offset, reserve.index(otherBranch), otherBranch])

      nodes.append({
        'id': sha,
        'y': offset * 50,
        # 'y': branch * 100,
        'x': index * 50,
        # 'routes': routes,
        'color': COLOURS[branch % len(COLOURS)],
        'fixed': True,
      })
      
      for parent in parents:
        edges.append({
          'from': sha,
          'to': parent,
        })

      
    print(json.dumps({
      'nodes': nodes,
      'edges': edges,
    }))


import sys
if __name__=="__main__":
  main(sys.argv)