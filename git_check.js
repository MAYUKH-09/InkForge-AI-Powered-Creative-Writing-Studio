import { execSync } from 'child_process';
try {
  const result = execSync('git log --name-status -n 5', { encoding: 'utf-8' });
  console.log(result);
} catch (e) {
  console.error("No git history");
}
