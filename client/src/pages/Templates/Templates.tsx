import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import type {
    Form,
} from "../../api/form.api";

import {
    templateApi,
} from "../../api/template.api";

import TemplatesHeader from "./components/TemplatesHeader/TemplatesHeader";
import TemplateGrid from "./components/TemplateGrid/TemplateGrid";
import TemplateEmpty from "./components/TemplateEmpty/TemplateEmpty";

import "./Templates.css";

const Templates = () => {
    const navigate = useNavigate();

    const [
        templates,
        setTemplates,
    ] = useState<Form[]>([]);

    const [
        isLoading,
        setIsLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response =
                    await templateApi.getAll();

                setTemplates(
                    response.data.templates,
                );
            } catch (error) {
                console.error(
                    "Failed to load templates:",
                    error,
                );

                setError(
                    "Failed to load templates. Please try again.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadTemplates();
    }, []);

    const templateCount =
        useMemo(
            () => templates.length,
            [templates],
        );

    const handleSaveTemplate = async (
        templateId: string,
    ) => {
        try {
            const response =
                await templateApi.save(
                    templateId,
                );

            const newFormId =
                response.data.form.id;

            navigate(
                `/forms/${newFormId}`,
            );
        } catch (error) {
            console.error(
                "Failed to save template:",
                error,
            );

            throw error;
        }
    };

    return (
        <div className="templates-page">

            <TemplatesHeader
                templateCount={templateCount}
            />

            {error ? (
                <div className="templates-error">
                    {error}
                </div>
            ) : (
                <>
                    {!isLoading &&
                    templates.length === 0 ? (
                        <TemplateEmpty />
                    ) : (
                        <TemplateGrid
                            templates={templates}
                            isLoading={isLoading}
                            onSave={
                                handleSaveTemplate
                            }
                        />
                    )}
                </>
            )}

        </div>
    );
};

export default Templates;
