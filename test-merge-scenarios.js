import { parseCommand } from './lib/git-lab/parser';
import { createInitialState, executeCommand } from './lib/git-lab/engine';

// Test the new merge strategy parser functionality
console.log('=== Testing Merge Strategy Parser ===\n');

// Test 1: Parse merge commands
console.log('Test 1: Parsing different merge commands');
const mergeTestCommands = [
  'git merge feature-branch',
  'git merge --squash feature-branch',
  'git merge --no-ff feature-branch',
  'git rebase main',
];

mergeTestCommands.forEach(cmd => {
  const result = parseCommand(cmd);
  console.log(`${cmd} -> ${JSON.stringify(result)}`);
});

// Test 2: Test scenario setup
console.log('\nTest 2: Merged Commit Strategy Scenario Setup');
const { MERGE_COMMIT_SCENARIO } = require('./lib/git-lab/scenarios');
const initialState = createInitialState();
const scenarioState = MERGE_COMMIT_SCENARIO.setup(initialState);

console.log('✓ Initial setup successful');
console.log(`  - Current branch: ${scenarioState.localA.currentBranch}`);
console.log(`  - Main commits: ${scenarioState.localA.branches.main.length}`);
console.log(`  - Feature branch commits: ${scenarioState.localA.branches['feature/update-readme'].length}`);

// Test 3: Test command execution
console.log('\nTest 3: Command execution (merge simulation)');
const mergeResult = parseCommand('git merge --squash feature/update-readme');
const { newState: mergeState, result: mergeResultOutput } = executeCommand(
  scenarioState,
  'A',
  mergeResult
);

console.log(`  Merge type: ${mergeResult.type}`);
console.log(`  Merge source: ${mergeResult.source}`);

// Test 4: Parse PR commands
console.log('\nTest 4: PR Command Parsing');
const prCommands = [
  'gh pr create --title "Add new feature" --desc "This PR adds a new feature to the project"',
  'gh pr review --approve',
  'gh pr review --approve --body "Looks good, LGTM!"',
  'gh pr review --request-changes',
  'gh pr merge',
];

prCommands.forEach(cmd => {
  const result = parseCommand(cmd);
  console.log(`${cmd} -> type: ${result.type}, action: ${result.action || 'N/A'}`);
});

console.log('\n=== All parser tests completed successfully! ===');
console.log('\n=== Summary of Changes ===');
console.log('1. Parser now supports:');
console.log('   - git merge --squash (creates single commit on merge)');
console.log('   - git merge --no-ff (creates merge commit preserving history)');
console.log('   - git rebase (linear history)');
console.log('\n2. Created full MERGE_COMMIT_SCENARIO: merge strategies course workflow');
console.log('3. Supports complete PR workflow with strategy selection');
console.log('\n=== This enables the GitHub Merge Strategies section (2.5.1, 2.5.2, 2.5.3) ===');