import {
	Box,
	Typography,
	Button,
	ListItemText,
	ListItem,
	List,
	Paper,
	Grid2,
	Container,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { RandomIconsBackground } from '../components/RandomIconsBackground'

export const Wod = () => {
	const navigate = useNavigate()

	const crossfitTerms = [
		{
			letter: 'A',
			terms: [
				{
					term: 'AS (air squat)',
					description:
						'повітряні присідання, присідання з вагою власного тіла.',
				},
				{
					term: 'AMRAP (as many rounds as possible)',
					description:
						'завершити максимальну кількість раундів у відведений проміжок часу.',
				},
				{
					term: 'AFAP (as fast as possible)',
					description: 'виконати комплекс якомога швидше.',
				},
			],
		},
		{
			letter: 'B',
			terms: [
				{
					term: 'Back Squat',
					description: 'присідання зі штангою.',
				},
				{
					term: 'Barbell',
					description: 'штанга.',
				},
				{
					term: 'Bear Crawl',
					description: 'ведмедяча хода.',
				},
				{
					term: 'Bench press',
					description: 'жим лежачи.',
				},
				{
					term: 'BJ (box jump)',
					description: 'застрибування на тумбу.',
				},
				{
					term: 'Burpee',
					description: 'бурпі, берпі.',
				},
				{
					term: 'Butterfly pull-ups',
					description: 'підтягування Батерфляй.',
				},
				{
					term: 'BW (BWT, Body weight)',
					description: 'вага тіла.',
				},
			],
		},
		{
			letter: 'C',
			terms: [
				{
					term: 'C2 (Concept II rowing machine)',
					description: 'концепт 2, веслувальний тренажер.',
				},
				{
					term: 'C2B (Chest to Bar pull-ups)',
					description: 'підтягування до грудей.',
				},
				{
					term: 'CLN (clean)',
					description: 'взяття на груди.',
				},
				{
					term: 'C&J (Clean&Jerk)',
					description: 'взяття на груди та поштовх.',
				},
				{
					term: 'CrossFit',
					description:
						'кросфіт, система функціонального тренінга, що базується на постійно змінюваних функціональних рухах, які виконуються з високою інтенсивністю.',
				},
				{
					term: 'CFT (CrossFit Total)',
					description:
						'тест, що складається з базових рухів: присідання, жиму та станової тяги.',
				},
			],
		},
		{
			letter: 'D',
			terms: [
				{
					term: 'Dead Bug',
					description:
						'вправа, в якій людина, що лежить на спині, направляє витягнуті руки та ноги вверх та опускає одночасно різнойменні руку та ногу, парами, по черзі.',
				},
				{
					term: 'Death by…',
					description:
						'послідовність, за якої на першу хвилину виконується одне повторення, на другу – два, на третю – 3, і так далі, поки вкладаєшся у відведену хвилину.',
				},
				{
					term: 'Dip',
					description: 'віджимання на брусах.',
				},
				{
					term: 'DL (Death Lift)',
					description: 'становая тяга.',
				},
				{
					term: 'DU (Double - Unders)',
					description: 'подвійні стрибки зі скакалкою.',
				},
				{
					term: 'Db (Dumbbell)',
					description: 'гантеля.',
				},
			],
		},
		{
			letter: 'E',
			terms: [
				{
					term: 'EMOM (Every Min of the Min)',
					description: 'виконувати вправи кожну хвилину впродовж N хвилин.',
				},
			],
		},
		{
			letter: 'F',
			terms: [
				{
					term: 'FS (Front Squat)',
					description: 'присідання зі штангою на грудях.',
				},
				{
					term: 'False Grip',
					description: 'глибокий хват на кільцях.',
				},
				{
					term: 'Floor Wipes',
					description: '«натиральник підлоги».',
				},
			],
		},
		{
			letter: 'G',
			terms: [
				{
					term: 'GPP (General Physical Preparedness)',
					description: 'загальна фізична підготовка (ЗФП).',
				},
				{
					term: 'GHD (Glute-Ham Developer)',
					description: 'тренажер поясниця-прес.',
				},
				{
					term: 'Goblet squat',
					description: 'присідання з утримуванням ваги перед собою.',
				},
			],
		},
		{
			letter: 'H',
			terms: [
				{
					term: 'Hammer Slam',
					description: 'удари кувалдою.',
				},
				{
					term: 'Handstand Push-up',
					description: 'віджимання в стійці на руках (вниз головою).',
				},
				{
					term: 'Hang Power Clean',
					description: 'взяття на груди з вису.',
				},
				{
					term: 'Hang Power Snatch',
					description: 'ривок з вису.',
				},
				{
					term: 'Hip Thrust',
					description: 'підйом тазу зі штангою на стегнах.',
				},
				{
					term: 'Hollow Rock',
					description:
						'«гойдалка» (одночасне підняття рук та ніг у положенні лежачи на животі).',
				},
				{
					term: 'Hook Grip',
					description: 'хват штанги в замок.',
				},
				{
					term: 'HPC (Hang Power Clean)',
					description: 'взяття на груди з вису (вище колін).',
				},
				{
					term: 'HSW (Hand stand walk)',
					description: 'ходьба на руках.',
				},
				{
					term: 'Hyperextension',
					description:
						'гіперекстензія, вправа для розвитку випрямлячів спини, згиначів стегна та сідничного м’яза.',
				},
			],
		},
		{
			letter: 'J',
			terms: [
				{
					term: 'Jerk',
					description: 'поштовх (повний цикл – взяття на груди та поштовх).',
				},
			],
		},
		{
			letter: 'K',
			terms: [
				{
					term: 'Kettlebell',
					description: 'гиря.',
				},
				{
					term: 'K2E (Knees to Elbows)',
					description: 'коліна до ліктів.',
				},
				{
					term: 'KBS (Kettlebell Swing)',
					description: 'мах гирею.',
				},
				{
					term: 'Kipping Pull-ups',
					description: 'підтягування кіпінгом з розкачкою.',
				},
			],
		},
		{
			letter: 'L',
			terms: [
				{
					term: 'L-hold',
					description: 'L-фіксування під кутом.',
				},
				{
					term: 'L-Pull-up',
					description: 'L-підтягування під кутом.',
				},
				{
					term: 'Lunges',
					description: 'випади.',
				},
			],
		},
		{
			letter: 'M',
			terms: [
				{
					term: 'Man Maker',
					description:
						'комплекс вправ, що тренує м’язи грудей, спину, ноги, плечі та сідниці, включає армійський жим, присідання з гирею над головою, взяття на груди, млин та ривок, вправи виконуються без відпочинку.',
				},
				{
					term: 'Medicine Ball',
					description: 'медбол, медичний м’яч.',
				},
				{
					term: 'Medicine Ball Cleans',
					description: 'взяття на груди з медичним м’ячем.',
				},
				{
					term: 'MetCon (Metabolic Conditioning workout)',
					description: 'метаболічне тренування (тренування на витривалість).',
				},
				{
					term: 'Military press',
					description: 'армійський жим.',
				},
				{
					term: 'MU (Muscle-up)',
					description: 'вихід силою, вихід на кільцях.',
				},
			],
		},
		{
			letter: 'O',
			terms: [
				{
					term: 'OHS (Overhead Squat)',
					description: 'присідання зі штангою над головою.',
				},
				{
					term: 'On-Ramp',
					description: 'кросфіт-тренування для новачків.',
				},
			],
		},
		{
			letter: 'P',
			terms: [
				{
					term: 'PB (Personal Best)',
					description: 'особистий рекорд.',
				},
				{
					term: 'Pistols',
					description: 'присідання на одній нозі.',
				},
				{
					term: 'Plank',
					description: 'планка.',
				},
				{
					term: 'Pull-ups',
					description: 'підтягування.',
				},
				{
					term: 'Push-ups',
					description: 'віджимання.',
				},
				{
					term: 'Prowler',
					description: 'поштовхова коляска.',
				},
			],
		},
		{
			letter: 'Q',
			terms: [
				{
					term: 'Quad',
					description: 'м’язи передньої частини стегна.',
				},
			],
		},
		{
			letter: 'R',
			terms: [
				{
					term: 'RDL (Romanian Dead Lift)',
					description: 'румунська станова тяга.',
				},
				{
					term: 'Row (C2)',
					description: 'веслування.',
				},
				{
					term: 'Rope Climb',
					description: 'лазіння по канату.',
				},
				{
					term: 'Rough',
					description: 'комплекс вправ на зміцнення спини.',
				},
				{
					term: 'Ringing',
					description: 'дослідження безкоштовних вагів.',
				},
			],
		},
		{
			letter: 'S',
			terms: [
				{
					term: 'Snatch',
					description: 'ривок (зі штангою).',
				},
				{
					term: 'Squat',
					description: 'присідання.',
				},
				{
					term: 'Sled Push/Pull',
					description: 'поштовх/тягнучка сани.',
				},
				{
					term: 'Sumo Dead Lift',
					description: 'становая тяга в широкій стійці.',
				},
				{
					term: 'Sit-up',
					description: 'сит-ап.',
				},
			],
		},
		{
			letter: 'T',
			terms: [
				{
					term: 'Tabata',
					description:
						'інтенсивний режим тренування, що включає 20 секунд активної роботи та 10 секунд відпочинку, повторюється 8 разів.',
				},
				{
					term: 'Thruster',
					description: 'присідання з жимом.',
				},
				{
					term: 'Tire Flip',
					description: 'перевернення шини.',
				},
			],
		},
		{
			letter: 'U',
			terms: [
				{
					term: 'Unilateral',
					description: 'вправа на одну сторону (одностороння).',
				},
			],
		},
		{
			letter: 'V',
			terms: [
				{
					term: 'V-Ups',
					description:
						'скручування, при якому одночасно піднімаються руки та ноги, утворюючи форму V.',
				},
			],
		},
		{
			letter: 'W',
			terms: [
				{
					term: 'Wall Ball',
					description:
						'управа з медболом, яка виконується шляхом кидка м’яча до стіни.',
				},
				{
					term: 'Wall Walks',
					description: 'ходьба по стіні.',
				},
				{
					term: 'Weighted Vest',
					description: 'жилет з вагою.',
				},
			],
		},
		{
			letter: 'Y',
			terms: [
				{
					term: 'Yoke',
					description: 'переносне навантаження на плечах.',
				},
			],
		},
		{
			letter: 'Z',
			terms: [
				{
					term: 'Z-Press',
					description: 'жим штанги сидячи з ногами вперед.',
				},
			],
		},
	]

	return (
		<Box
			padding={{ xs: '7rem 0rem 5rem 0rem', sm: '7rem 2rem 5rem 2rem' }}
			sx={
				{
					// display: 'flex',
					// flexDirection: 'column',
					// alignItems: 'center',
					// justifyContent: 'center',
					// height: '100vh',
					// backgroundColor: '#121212',
					// color: 'white',
					// textAlign: 'center',
					// padding: '20px',
				}
			}
		>
			{/* <UploadImageToS3WithReactS3 /> */}
			<div className='inner-page page-news'>
				<Box>
					<Typography
						variant='h4'
						align='center'
						gutterBottom
						textTransform='uppercase'
						fontWeight='bold'
					>
						Термінологія CROSSFIT
					</Typography>
					<div>
						<Grid2 container spacing={2}>
							{crossfitTerms.map(item => (
								<Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={item.letter}>
									<Paper
										elevation={3}
										style={{ padding: '16px', height: '100%' }}
									>
										<Typography variant='h3' color='primary'>
											{item.letter}
										</Typography>
										<List>
											{item.terms.map(term => (
												<ListItem key={term.term}>
													<ListItemText
														primary={term.term}
														secondary={term.description}
													/>
												</ListItem>
											))}
										</List>
									</Paper>
								</Grid2>
							))}
						</Grid2>
					</div>
				</Box>
			</div>
		</Box>
	)
}
