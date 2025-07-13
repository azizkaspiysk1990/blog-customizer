import React, { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

import s from './App.module.scss';

export const App: React.FC = () => {
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};

	const styleVars: CSSProperties = {
		'--font-family': settings.fontFamilyOption.value,
		'--font-size': settings.fontSizeOption.value,
		'--font-color': settings.fontColor.value,
		'--container-width': settings.contentWidth.value,
		'--bg-color': settings.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={s.main} style={styleVars}>
			<ArticleParamsForm onApply={handleApply} />
			<Article />
		</main>
	);
};
