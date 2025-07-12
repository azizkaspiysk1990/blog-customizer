import React, { useState, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { useCloseForm } from '../hooks/useCloseForm';

import s from './ArticleParamsForm.module.scss';

type Props = {
	onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm: React.FC<Props> = ({ onApply }) => {
	const [open, setOpen] = useState(false);
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLFormElement>(null);

	const handleToggle = () => setOpen((prev) => !prev);

	const mergeSettings = useCallback((patch: Partial<ArticleStateType>) => {
		setSettings((prev) => ({ ...prev, ...patch }));
	}, []);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(settings);
		setOpen(false);
	};

	const handleReset = () => {
		setSettings(defaultArticleState);
		onApply(defaultArticleState);
		setOpen(false);
	};

	useCloseForm({
		isOpen: open,
		refForm: formRef,
		onClose: () => setOpen(false),
	});

	const placeholders = useMemo(
		() => ({
			fontFamily:
				settings.fontFamilyOption?.title || fontFamilyOptions[0]?.title,
			fontSize: settings.fontSizeOption?.title || fontSizeOptions[0]?.title,
			fontColor: settings.fontColor?.title || fontColors[0]?.title,
			background: settings.backgroundColor?.title || backgroundColors[0]?.title,
			contentWidth: settings.contentWidth?.title || contentWidthArr[0]?.title,
		}),
		[settings]
	);

	return (
		<>
			<ArrowButton isOpen={open} onClick={handleToggle} />

			<aside className={clsx(s.container, { [s.container_open]: open })}>
				<form ref={formRef} className={s.form} onSubmit={onSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Настройка статьи
					</Text>

					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={settings.fontFamilyOption}
						placeholder={placeholders.fontFamily}
						onChange={(val) => mergeSettings({ fontFamilyOption: val })}
					/>

					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={settings.fontSizeOption}
						onChange={(val) => mergeSettings({ fontSizeOption: val })}
					/>

					<Select
						title='Цвет текста'
						options={fontColors}
						selected={settings.fontColor}
						placeholder={placeholders.fontColor}
						onChange={(val) => mergeSettings({ fontColor: val })}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={settings.backgroundColor}
						placeholder={placeholders.background}
						onChange={(val) => mergeSettings({ backgroundColor: val })}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={settings.contentWidth}
						placeholder={placeholders.contentWidth}
						onChange={(val) => mergeSettings({ contentWidth: val })}
					/>

					<div className={s.bottom}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
