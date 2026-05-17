import { askGemini } from './gemini.service.js';
import { getProjectById, updateProject } from './project.service.js';
import { buildGenerationPrompt } from '../constants/prompts.js';
import { parseGenerationResponse } from '../utils/code.utils.js';

export const generateCode = async (projectId, userId, userPrompt) => {
  try {
    console.log(`[Generation] Starting code generation for project: ${projectId}`);
    
    const project = await getProjectById(projectId, userId);
    console.log(`[Generation] Project loaded: ${project.id}`);

    const fullPrompt = buildGenerationPrompt(
      project.messages,
      project.generatedCode,
      userPrompt
    );
    console.log(`[Generation] Prompt built, calling Gemini...`);

    const aiResponse = await askGemini(fullPrompt);
    console.log(`[Generation] Gemini response received`);

    const { description, code } = parseGenerationResponse(aiResponse);
    console.log(`[Generation] Response parsed`);

    project.messages.push({
      role: 'user',
      content: userPrompt,
      timestamp: new Date(),
    });

    project.messages.push({
      role: 'assistant',
      content: description || 'Here is your generated code.',
      timestamp: new Date(),
    });

    if (project.generatedCode && code) {
      project.versions.push({
        code: project.generatedCode,
        prompt: userPrompt,
        createdAt: new Date(),
      });
    }

    if (code) {
      project.generatedCode = code;
    }

    if (project.title === 'Untitled Project' && project.messages.length <= 2) {
      project.title = userPrompt.length > 50
        ? userPrompt.substring(0, 50) + '...'
        : userPrompt;
    }

    project.updatedAt = new Date();
    
    console.log(`[Generation] Saving project...`);
    await updateProject(projectId, userId, {
      messages: project.messages,
      versions: project.versions,
      generatedCode: project.generatedCode,
      title: project.title,
    });
    console.log(`[Generation] Project saved successfully`);

    return {
      message: {
        role: 'assistant',
        content: description || 'Here is your generated code.',
        timestamp: new Date(),
      },
      generatedCode: project.generatedCode,
      versionIndex: project.versions.length,
    };
  } catch (error) {
    console.error(`[Generation] Error:`, error.message);
    throw error;
  }
};