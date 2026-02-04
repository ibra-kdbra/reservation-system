#!/usr/bin/env node

/**
 * Changelog Generator Script
 * Automates the creation and management of file-specific changelogs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHANGELOGS_DIR = path.join(__dirname, '..', 'changelogs');
const ROOT_DIR = path.join(__dirname, '..');

// Ensure changelogs directory exists
if (!fs.existsSync(CHANGELOGS_DIR)) {
    fs.mkdirSync(CHANGELOGS_DIR, { recursive: true });
}

/**
 * Get current timestamp
 */
function getTimestamp() {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    return { date, time };
}

/**
 * Get current git commit hash (if in git repo)
 */
function getCommitHash() {
    try {
        return execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    } catch {
        return 'N/A';
    }
}

/**
 * Get git author name
 */
function getAuthor() {
    try {
        return execSync('git config user.name', { encoding: 'utf-8' }).trim();
    } catch {
        return 'Unknown';
    }
}

/**
 * Get changelog path for a file
 */
function getChangelogPath(filePath) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    const changelogPath = path.join(CHANGELOGS_DIR, `${relativePath}.md`);
    return changelogPath;
}

/**
 * Create changelog entry
 */
function createChangelogEntry(filePath, description, action = 'Modified', changes = [], reason = '', impact = '') {
    const { date, time } = getTimestamp();
    const commit = getCommitHash();
    const author = getAuthor();

    const entry = `
## ${date} - ${time} - ${author}
**Action**: ${action}
**Commit**: ${commit}
**Description**: ${description}

### Changes:
${changes.length > 0 ? changes.map(c => `- ${c}`).join('\n') : '- See description above'}

${reason ? `### Reason:\n${reason}\n` : ''}
${impact ? `### Impact:\n${impact}\n` : ''}
---
`;

    return entry;
}

/**
 * Add changelog entry to file
 */
function addChangelogEntry(filePath, description, options = {}) {
    const changelogPath = getChangelogPath(filePath);
    const changelogDir = path.dirname(changelogPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(changelogDir)) {
        fs.mkdirSync(changelogDir, { recursive: true });
    }

    const relativePath = path.relative(ROOT_DIR, filePath);
    const action = options.action || (fs.existsSync(filePath) ? 'Modified' : 'Created');
    const changes = options.changes || [];
    const reason = options.reason || '';
    const impact = options.impact || '';

    let content = '';

    // If changelog doesn't exist, create header
    if (!fs.existsSync(changelogPath)) {
        content = `# Changelog: ${relativePath}\n\n`;
    } else {
        content = fs.readFileSync(changelogPath, 'utf-8');
    }

    // Add new entry after header
    const entry = createChangelogEntry(filePath, description, action, changes, reason, impact);
    const lines = content.split('\n');
    const headerEndIndex = lines.findIndex((line, idx) => idx > 0 && line.startsWith('#'));

    if (headerEndIndex > 0) {
        lines.splice(headerEndIndex, 0, entry);
        content = lines.join('\n');
    } else {
        content += entry;
    }

    fs.writeFileSync(changelogPath, content);
    console.log(`✅ Changelog updated: ${changelogPath}`);

    return changelogPath;
}

/**
 * View changelog for a file
 */
function viewChangelog(filePath) {
    const changelogPath = getChangelogPath(filePath);

    if (!fs.existsSync(changelogPath)) {
        console.log(`❌ No changelog found for: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(changelogPath, 'utf-8');
    console.log(content);
}

/**
 * Generate summary of recent changes
 */
function generateSummary(since) {
    const sinceDate = since ? new Date(since) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    console.log(`\n📊 Changelog Summary (since ${sinceDate.toISOString().split('T')[0]})\n`);
    console.log('='.repeat(80));

    let totalChanges = 0;

    function walkDir(dir) {
        const files = fs.readdirSync(dir);

        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walkDir(fullPath);
            } else if (file.endsWith('.md')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const entries = content.split('##').filter(e => e.trim());

                entries.forEach(entry => {
                    const dateMatch = entry.match(/^(\d{4}-\d{2}-\d{2})/);
                    if (dateMatch) {
                        const entryDate = new Date(dateMatch[1]);
                        if (entryDate >= sinceDate) {
                            totalChanges++;
                            const descMatch = entry.match(/\*\*Description\*\*: (.+)/);
                            const relativePath = path.relative(CHANGELOGS_DIR, fullPath).replace('.md', '');
                            console.log(`\n📝 ${relativePath}`);
                            console.log(`   ${dateMatch[1]} - ${descMatch ? descMatch[1] : 'No description'}`);
                        }
                    }
                });
            }
        });
    }

    if (fs.existsSync(CHANGELOGS_DIR)) {
        walkDir(CHANGELOGS_DIR);
    }

    console.log('\n' + '='.repeat(80));
    console.log(`\nTotal changes: ${totalChanges}\n`);
}

/**
 * CLI Interface
 */
function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case 'add': {
            const filePath = args[1];
            const description = args[2];

            if (!filePath || !description) {
                console.error('Usage: npm run changelog:add <file-path> "<description>"');
                process.exit(1);
            }

            const fullPath = path.resolve(ROOT_DIR, filePath);
            addChangelogEntry(fullPath, description);
            break;
        }

        case 'view': {
            const filePath = args[1];

            if (!filePath) {
                console.error('Usage: npm run changelog:view <file-path>');
                process.exit(1);
            }

            const fullPath = path.resolve(ROOT_DIR, filePath);
            viewChangelog(fullPath);
            break;
        }

        case 'summary': {
            const sinceFlag = args.find(arg => arg.startsWith('--since='));
            const since = sinceFlag ? sinceFlag.split('=')[1] : null;
            generateSummary(since);
            break;
        }

        default:
            console.log(`
Changelog Generator - Usage:

  npm run changelog:add <file-path> "<description>"
    Add a new changelog entry for a file

  npm run changelog:view <file-path>
    View the changelog for a file

  npm run changelog:summary [--since=YYYY-MM-DD]
    Generate a summary of recent changes

Examples:
  npm run changelog:add apps/api/src/main.ts "Added rate limiting"
  npm run changelog:view apps/api/src/main.ts
  npm run changelog:summary --since=2026-02-01
      `);
    }
}

// Export functions for programmatic use
module.exports = {
    addChangelogEntry,
    viewChangelog,
    generateSummary,
    getChangelogPath
};

// Run CLI if executed directly
if (require.main === module) {
    main();
}
