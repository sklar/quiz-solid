import { createMemo, createSignal } from 'solid-js'

type Operation = '+' | '-'

export interface Question {
	num1: number
	num2: number
	operation: Operation
	isCorrect: boolean
}

const NUMBER_OF_QUESTIONS = 5

const generateQuestion = (): Question => {
	const operation: Operation = Math.random() < 0.5 ? '+' : '-'
	const num1 = Math.floor(Math.random() * (operation === '+' ? 50 : 100)) + 1
	const num2 =
		Math.floor(Math.random() * (operation === '+' ? 100 - num1 : num1)) + 1

	return { num1, num2, operation, isCorrect: false }
}

export const calculateAnswer = ({
	num1,
	num2,
	operation,
}: Question): number => {
	return operation === '+' ? num1 + num2 : num1 - num2
}

export const createQuiz = () => {
	const [questions, setQuestions] = createSignal<Question[]>([])
	const [currentQuestionIndex, setCurrentQuestionIndex] = createSignal(0)
	const [startTime, setStartTime] = createSignal(0)
	const [timeTaken, setTimeTaken] = createSignal(0)

	const isSetComplete = createMemo(() => questions().every((q) => q.isCorrect))

	const currentQuestion = createMemo(() => questions()[currentQuestionIndex()])

	const generateNewSet = () => {
		setQuestions(Array.from({ length: NUMBER_OF_QUESTIONS }, generateQuestion))
		setCurrentQuestionIndex(0)
		setStartTime(Date.now())
		setTimeTaken(0)
	}

	const answerQuestion = (isCorrect: boolean) => {
		setQuestions((prev) =>
			prev.map((q, index) =>
				index === currentQuestionIndex() ? { ...q, isCorrect } : q,
			),
		)

		if (isCorrect) {
			const nextIncorrectIndex = questions().findIndex(
				(q, index) => !q.isCorrect && index > currentQuestionIndex(),
			)
			setCurrentQuestionIndex(
				nextIncorrectIndex !== -1
					? nextIncorrectIndex
					: questions().findIndex((q) => !q.isCorrect),
			)
		}

		if (isSetComplete()) {
			setTimeTaken((Date.now() - startTime()) / 1000)
		}
	}

	return {
		answerQuestion,
		currentQuestion,
		generateNewSet,
		isSetComplete,
		questions,
		timeTaken,
	}
}
