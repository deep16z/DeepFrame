import { DeepseekAPI } from '../api/DeepseekAPI';
import { MemoryStore } from '../memory/MemoryStore';
import { Logger } from '../utils/Logger';

/**
 * Deep16zAgent - The brain of the operation 🧠
 * This class handles the core logic for interacting with the Deepseek API,
 * managing memory, and executing actions. Think of it as the conductor of an orchestra.
 */
export class Deep16zAgent {
  private deepseekAPI: DeepseekAPI;
  private memoryStore: MemoryStore;
  private logger: Logger;

  constructor(config: { apiKey: string; model: string; apiUrl: string }) {
    // Initialize the Deepseek API client
    this.deepseekAPI = new DeepseekAPI({
      apiKey: config.apiKey,
      model: config.model,
      apiUrl: config.apiUrl,
    });

    // Set up memory storage (because even agents need to remember stuff)
    this.memoryStore = new MemoryStore();

    // Initialize the logger (for when things go wrong or right)
    this.logger = new Logger('Deep16zAgent');
  }

  /**
   * Start the agent 🚀
   * This method kicks off the agent's main loop, where it listens for inputs,
   * processes them, and generates responses. It's like turning on a robot but fancier.
   */
  async start(): Promise<void> {
    this.logger.info('Starting Deep16z agent...');

    try {
      // Load memory from storage (because we don't want to start from scratch)
      await this.memoryStore.load();

      // Start listening for inputs (like a chatbot waiting for a message)
      this.logger.info('Agent is running and ready to chat!');
    } catch (error) {
      this.logger.error('Failed to start agent:', error);
      throw error;
    }
  }

  /**
   * Process input and generate a response 🎤
   * This method takes user input, processes it using the Deepseek API,
   * and returns a response. It's like having a conversation with a very smart toaster.
   */
  async processInput(input: string): Promise<string> {
    this.logger.info(`Processing input: "${input}"`);

    // Check memory for context (because context is everything)
    const context = await this.memoryStore.getContext(input);

    // Call the Deepseek API to generate a response
    const response = await this.deepseekAPI.generateResponse(input, context);

    // Save the interaction to memory (for future reference)
    await this.memoryStore.saveInteraction(input, response);

    this.logger.info(`Generated response: "${response}"`);
    return response;
  }

  /**
   * Stop the agent 🛑
   * This method gracefully shuts down the agent, saving memory and cleaning up resources.
   * It's like putting the robot to sleep (but not in a creepy way).
   */
  async stop(): Promise<void> {
    this.logger.info('Stopping Deep16z agent...');

    // Save memory to storage (because we don't want to forget everything)
    await this.memoryStore.save();

    this.logger.info('Agent stopped successfully.');
  }
}
