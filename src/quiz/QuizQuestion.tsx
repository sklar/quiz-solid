import { type Component, createSignal } from 'solid-js'
import { type Question, calculateAnswer } from './quiz.controller'

import classes from './Quiz.module.css'

interface QuizQuestionProps {
	question: Question
	onAnswer: (isCorrect: boolean) => void
}

export const QuizQuestion: Component<QuizQuestionProps> = (props) => {
	const [userAnswer, setUserAnswer] = createSignal('')
	let inputRef: HTMLInputElement | undefined

	const handleSubmit = (event: Event) => {
		event.preventDefault()

		if (userAnswer() === '') return

		const isCorrect =
			Number.parseInt(userAnswer()) === calculateAnswer(props.question)

		props.onAnswer(isCorrect)
		setUserAnswer('')
		inputRef?.focus()
	}

	return (
		<form onSubmit={handleSubmit}>
			<p class={classes.question}>
				<span>{props.question.num1}</span>
				<span>{props.question.operation}</span>
				<span>{props.question.num2}</span>
				<span>=</span>
				<input
					type="number"
					placeholder="???"
					value={userAnswer()}
					autofocus
					ref={inputRef}
					onInput={(e) => setUserAnswer(e.currentTarget.value)}
				/>
			</p>
		</form>
	)
}
