import party from 'party-js'
import { type Component, createEffect, createSignal, onMount } from 'solid-js'

import { QuizProgress } from './QuizProgress'
import { QuizQuestion } from './QuizQuestion'
import { QuizResult } from './QuizResult'
import { createQuiz } from './quiz.controller'

import classes from './Quiz.module.css'

const celebrationGifs = [
	'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif',
	'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
	'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
	'https://media.giphy.com/media/l0MYGzh7pUL2SOyty/giphy.gif',
	'https://media.giphy.com/media/26BRBKqUiq586bRVm/giphy.gif',
	'https://media.giphy.com/media/cXaeWuJ1oKO4g/giphy.gif',
	'https://media.giphy.com/media/6MMxtt269tcAM/giphy.gif',
	'https://media.giphy.com/media/fwqAg6ZS6ebL2/giphy.gif',
	'https://media.giphy.com/media/DqZKCC1rRht8FmnKbv/giphy.gif',
	'https://media.giphy.com/media/Swx36wwSsU49HAnIhC/giphy.gif',
	'https://media.giphy.com/media/xDpB3lRInUYla/giphy.gif',
	'https://media.giphy.com/media/ujUdrdpX7Ok5W/giphy.gif',
]

export const Quiz: Component = () => {
	let confettiRef: HTMLDivElement | undefined

	const [celebrationGif, setCelebrationGif] = createSignal('')

	const quiz = createQuiz()

	const handleReload = () => {
		setCelebrationGif('')
		quiz.generateNewSet()
	}

	onMount(() => {
		quiz.generateNewSet()
	})

	createEffect(() => {
		if (quiz.isSetComplete()) {
			setCelebrationGif(
				celebrationGifs[Math.floor(Math.random() * celebrationGifs.length)],
			)
			if (confettiRef) {
				party.confetti(confettiRef, {
					count: party.variation.range(80, 160),
				})
			}
		}
	})

	return (
		<section class={classes.container}>
			<header class={classes.header}>
				<h1>Math Quiz</h1>
			</header>
			<div class={classes.body}>
				{!quiz.isSetComplete() && quiz.currentQuestion() && (
					<QuizQuestion
						question={quiz.currentQuestion()!}
						onAnswer={quiz.answerQuestion}
					/>
				)}
			</div>
			<footer>
				{!quiz.isSetComplete() ? (
					<QuizProgress questions={quiz.questions} />
				) : (
					<QuizResult time={quiz.timeTaken()} onReload={handleReload} />
				)}
			</footer>
			<div ref={confettiRef} class={classes.confetti} />
			<div
				class={classes.celebrationGif}
				style={{ 'background-image': `url(${celebrationGif()})` }}
			/>
		</section>
	)
}
