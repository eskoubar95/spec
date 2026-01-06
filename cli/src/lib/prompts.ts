import inquirer from 'inquirer';

export interface InitAnswers {
  projectName: string;
  taskMode: 'local' | 'linear';
  gitInit: boolean;
}

/**
 * Prompts the user for project initialization options
 */
export async function promptInit(): Promise<InitAnswers> {
  const answers = await inquirer.prompt<InitAnswers>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name (folder name):',
      validate: (input: string) => {
        if (!input.trim()) {
          return 'Project name cannot be empty';
        }
        // Basic validation for folder names
        if (/[<>:"/\\|?*]/.test(input)) {
          return 'Project name contains invalid characters';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'taskMode',
      message: 'Task mode:',
      choices: [
        { name: 'local', value: 'local' },
        { name: 'linear', value: 'linear' },
      ],
      default: 'local',
    },
    {
      type: 'confirm',
      name: 'gitInit',
      message: 'Initialize git repository?',
      default: true,
    },
  ]);

  return answers;
}
