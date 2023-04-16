// src/llm_api.ts
import axios from 'axios';

export const fetchModels = async (API_URL: string) => {
  const response = await axios.get(`${API_URL}/models`);
  return response.data.models;
};

export const loadModel = async (API_URL: string, modelIdx: number) => {
  await axios.post(`${API_URL}/models`, { model_idx: modelIdx });
};

export const generateText = async (
  API_URL: string,
  prompt: string,
  n_predict: number,
  n_threads: number
) => {
  const response = await axios.post(`${API_URL}/generate`, {
    prompt,
    n_predict,
    n_threads,
  });
  return response.data.generated_text;
};

export const createWebSocket = (url: string) => {
  return new WebSocket(url);
};
