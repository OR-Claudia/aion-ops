import { useCallback, useEffect, useRef } from "react";

const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
	callback: T,
	delay: number
): T => {
	const handlerRef = useRef<number | null>(null);

	const debouncedCallback = useCallback(
		(...args: Parameters<T>) => {
			if (handlerRef.current !== null) {
				clearTimeout(handlerRef.current);
			}
			handlerRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	useEffect(() => {
		return () => {
			if (handlerRef.current !== null) {
				clearTimeout(handlerRef.current);
			}
		};
	}, [handlerRef]);

	return debouncedCallback as T;
};

export default useDebouncedCallback;
