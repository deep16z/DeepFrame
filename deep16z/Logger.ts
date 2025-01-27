/**
 * Logger - The agent's personal scribe 📜
 * This class handles logging messages to the console (or elsewhere). It's like
 * having a narrator for your code.
 */
export class Logger {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  /**
   * Log an info message ℹ️
   * This method logs informational messages. It's like saying, "Hey, everything's fine!"
   */
  info(message: string): void {
    console.log(`[${this.name}] INFO: ${message}`);
  }

  /**
   * Log an error message ❌
   * This method logs error messages. It's like saying, "Uh-oh, something went wrong!"
   */
  error(message: string, error?: Error): void {
    console.error(`[${this.name}] ERROR: ${message}`, error);
  }
}
