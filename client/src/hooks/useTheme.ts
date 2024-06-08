import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { setTheme } from "../redux/slices/themeSlice";

export const useTheme = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.value);

    const savedTheme = sessionStorage.getItem("theme");

    const setCurrentTheme = (currentTheme: string | null) => {
        dispatch(setTheme(currentTheme));
    };

    const toggleTheme = () => {
        const updatedTheme = theme === "light" ? "dark" : "light";

        dispatch(setTheme(updatedTheme));
        sessionStorage.setItem("theme", updatedTheme);
    }

    return { theme, savedTheme, setCurrentTheme, toggleTheme };
}