workflow "Test & Cov" {
  on = "push"
  resolves = ["codecov"]
}

action "install" {
  uses = "docker://node:alpine"
  runs = "npm"
  args = "ci"
}

action "test" {
  needs = "npm ci"
  uses = "docker://node:alpine"
  runs = "npm"
  args = "test"
}

action "codecov" {
  needs = "npm test"
  uses = "docker://node"
  runs = "npx"
  args = "codecov"
  secrets = ["CODECOV_TOKEN"]
}
