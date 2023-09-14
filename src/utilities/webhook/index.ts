import fs from 'fs';
import path from 'path';
import {
  codeBlocksRegex,
  reviewFileName,
  userOptions,
} from 'src/utilities/constant';
import {
  deleteFileSync,
  getUserEmail,
  simplyReviewData,
} from 'src/utilities/helpers';

import { INoticeTask, IWebhookOptions } from './constant';

/**
 * Webhook notifier
 * @param {string} channel The webhook channel
 * @param {string} userEmail The user email
 */
class WebhookNotifier {
  private readonly userEmail: string;
  private readonly channel: string;
  private tasks: string[];

  constructor({
    channel = userOptions.options.reviewReportWebhook,
    userEmail = '',
  }: IWebhookOptions = {}) {
    this.tasks = [];

    if (!channel) return;
    this.userEmail = userEmail;
    this.channel = channel;
  }

  /**
   * Add a notice task
   */
  public addNoticeTask(task: INoticeTask) {
    if (!task) return;

    this.tasks.push(
      `__${path.dirname(task.filePath).split('/').pop()}/${path.basename(
        task.filePath,
      )}__ \\r• ${task.message}`,
    );
  }

  /**
   * Publish all notices to the webhook channel
   */
  async publishNotice() {
    if (!this.tasks?.length) return;
    const content = this.tasks.join('\\r\\r\\n');
    const reviewFilePath = `${path.join(process.cwd(), reviewFileName)}`;

    deleteFileSync(reviewFilePath);

    // Write the output text to a file if there are code blocks
    if (codeBlocksRegex.test(content)) {
      fs.writeFileSync(reviewFilePath, content, 'utf-8');
    }

    // If no channel is provided, log the content to the console
    if (userOptions.options.debug) {
      console.log(
        'publishNotice: channel=%s, content=%s',
        this.channel,
        content,
      );
    }

    if (!this.channel) return;

    const mention = this.userEmail || getUserEmail();
    const data = `${mention ? `@${mention} ` : ''}${simplyReviewData(content)}`;

    try {
      await fetch(this.channel, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag: 'markdown', markdown: { content: data } }),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default WebhookNotifier;
