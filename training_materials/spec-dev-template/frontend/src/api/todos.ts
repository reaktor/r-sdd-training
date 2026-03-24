const API_URL = 'http://localhost:3000/api';

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
}

/**
 * Fetch all todos from the backend
 */
export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: Failed to fetch todos`);
  }
  return (await response.json()) as Todo[];
}

/**
 * Create a new todo on the backend
 * @param payload - The todo data to create
 * @returns The created todo with id and timestamps
 */
export async function createTodo(payload: CreateTodoPayload): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = (await response.json()) as { error?: string };
    throw new Error(errorData.error ?? `HTTP ${response.status}: Failed to create todo`);
  }

  return (await response.json()) as Todo;
}
