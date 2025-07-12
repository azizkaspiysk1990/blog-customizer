import { useEffect, RefObject } from 'react';

type UseCloseFormProps = {
	isOpen: boolean;
	refForm: RefObject<HTMLElement>;
	onClose: () => void;
};

export const useCloseForm = ({
	isOpen,
	refForm,
	onClose,
}: UseCloseFormProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const onPointerDown = (evt: PointerEvent) => {
			const targetNode = evt.target as Node;
			const isClickInside = refForm.current?.contains(targetNode);

			if (!isClickInside) {
				console.debug('useCloseForm: Detected outside click, closing.');
				onClose();
			}
		};

		window.addEventListener('pointerdown', onPointerDown);

		return () => {
			window.removeEventListener('pointerdown', onPointerDown);
		};
	}, [isOpen, refForm, onClose]);
};
