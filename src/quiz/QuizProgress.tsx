import type { Accessor, Component } from 'solid-js'

import type { Question } from './quiz.controller'

import classes from './Quiz.module.css'

interface QuizProgressProps {
	questions: Accessor<Question[]>
}

export const QuizProgress: Component<QuizProgressProps> = (props) => {
	return (
		<p class={classes.result} aria-label="Correct answers of all answers">
			{props.questions().filter((q) => q.isCorrect).length} of{' '}
			{props.questions().length}
		</p>
	)
}
