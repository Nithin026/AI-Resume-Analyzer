import api from "../api/axios";

export const generateInterview =
async (data) => {

    const response =
        await api.post(
            "/api/interviews/generate",
            data
        );

    return response.data;
};
export const getInterviewSession =
async (sessionId) => {

    const response =
        await api.get(
            `/api/interviews/${sessionId}`
        );

    return response.data;
};
export const getInterviewHistory =
async () => {

    const response =
        await api.get(
            "/api/interviews"
        );

    return response.data;
};

export const deleteInterview =
    async (sessionId) => {

        const response =
            await api.delete(
                `/api/interviews/${sessionId}`
            );

        return response.data;
    };