import api from "../api/axios";

export const uploadResume = async (
    file
) => {

    const formData =
        new FormData();

    formData.append(
        "file",
        file
    );

    const token =
        localStorage.getItem(
            "token"
        );

    const response =
        await api.post(
            "/api/resumes/upload",
            formData,
            {
                headers: {

                    Authorization:
                    `Bearer ${token}`,

                    "Content-Type":
                    "multipart/form-data"
                }
            }
        );

    return response.data;
};

export const getUserResumes = async () => {

    const token =
        localStorage.getItem(
            "token"
        );

    const response =
        await api.get(
            "/api/resumes",
            {
                headers: {
                    Authorization:
                    `Bearer ${token}`
                }
            }
        );

    return response.data;
};

export const deleteResume = async (
    resumeId
) => {

    const response =
        await api.delete(
            `/api/resumes/${resumeId}`
        );

    return response.data;
};