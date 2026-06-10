import api from "../api/axios";

export const runAnalysis = async (data) => {
    const token = localStorage.getItem("token");

    const response = await api.post(
        "/api/analyses/",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getAnalysisHistory = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get(
        "/api/analyses/",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getAnalysisById = async (analysisId) => {
    const token = localStorage.getItem("token");

    const response = await api.get(
        `/api/analyses/${analysisId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteAnalysis =
    async (analysisId) => {

        const response =
            await api.delete(
                `/api/analyses/${analysisId}`
            );

        return response.data;
    };