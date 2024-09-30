import type { Component } from 'solid-js'

import classes from './Quiz.module.css'

interface QuizResultProps {
	time: number
	onReload: () => void
}

export const QuizResult: Component<QuizResultProps> = (props) => {
	return (
		<p class={classes.result}>
			<time
				class={classes.timer}
				aria-label="Time to complete the questions set"
			>
				{props.time.toFixed(0)} seconds
			</time>
			<button
				type="button"
				class={classes.button}
				aria-label="Load another set of questions"
				onClick={props.onReload}
			>
				Reload
			</button>
		</p>
	)
}
