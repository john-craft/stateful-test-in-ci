
// import { terminalCodesToHtml } from "terminal-codes-to-html";
import * as fs from 'fs';
import { AnsiUp } from 'ansi_up';

  const { MIGRATION_OUTPUT, EXIT_CODE } = process.env
  if (!MIGRATION_OUTPUT) {
    console.error('Error: MIGRATION_OUTPUT is not set.');
    process.exit(1);
  }

  
  // const fs = require('fs');

  let ansi_up = new AnsiUp();
  // const html = terminalCodesToHtml(MIGRATION_OUTPUT);
  const html = ansi_up.ansi_to_html(MIGRATION_OUTPUT);

  const migrationMessage = EXIT_CODE == 0 ? 'Migration successful' : 'Migration failed with exit code ' + EXIT_CODE + ':\n\n' + html;
  const commentIdentifier = '🔄 Sequelize Migration Result'; // Unique identifier for the comment
  const commentBody = commentIdentifier + '\n\n' + migrationMessage;

  fs.writeFileSync('formatted_output.html', commentBody);

  // const pr_number = context.payload.pull_request.number;
  // const { owner, repo } = context.repo;

  // const payload = {
  //   issue_number: pr_number,
  //   owner,
  //   repo
  // }
  
  // // Find existing comment
  // const comments = await github.rest.issues.listComments(payload);

  // const migrationComment = comments.data.find(comment => comment.body.startsWith(commentIdentifier));

  // // Update existing comment or create a new one
  // if (migrationComment) {
  //   await github.rest.issues.updateComment({
  //     owner,
  //     repo,
  //     comment_id: migrationComment.id,
  //     body: commentBody
  //   });
  // } else {
  //   await github.rest.issues.createComment({
  //     issue_number: pr_number,
  //     owner,
  //     repo,
  //     body: commentBody
  //   });
  // }
