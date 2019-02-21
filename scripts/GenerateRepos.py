import random

NUM_REPOS = 1000


nouns = ("puppy", "car", "rabbit", "girl", "monkey")
verbs = ("runs", "hits", "jumps", "drives", "barfs") 
adv = ("crazily.", "dutifully.", "foolishly.", "merrily.", "occasionally.")
adj = ("adorable", "clueless", "dirty", "odd", "stupid")

def gen(): return random.randrange(0, 5)

def generateTitle():
  return " ".join([adj[gen()], nouns[gen()]])

def generateDesc():
  return " ".join([adj[gen()], nouns[gen()], verbs[gen()], adj[gen()], nouns[gen()], adv[gen()]])


repos = { 
  i: {
    'name': generateTitle(),
    'desc': generateDesc(),
  }
  for i in range(NUM_REPOS)
}

print(repos)