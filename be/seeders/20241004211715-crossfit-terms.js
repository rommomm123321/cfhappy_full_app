'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const crossfitTerms = [
			{ term: 'Air Squat', definition: 'воздушные приседания' },
			{
				term: 'AMRAP',
				definition:
					'as many rounds as possible / сделать как можно большее количество раундов за отведенный промежуток времени',
			},
			{
				term: 'AFAP',
				definition:
					'as fast as possible / сделать заданное задание как можно быстрее',
			},
			{
				term: 'Back Extension',
				definition: 'гиперэкстензии, экстензии боков, экстензии бедер и спины',
			},
			{ term: 'Back squat', definition: 'приседания со штангой на плечах' },
			{ term: 'Ball Slams', definition: 'удар мячом об пол' },
			{ term: 'Barbell', definition: 'штанга' },
			{ term: 'Bear Crawl', definition: 'медвежья походка' },
			{ term: 'Bench press', definition: 'жим лежа' },
			{ term: 'BJ (Box Jump)', definition: 'запрыгивания на тумбу' },
			{ term: 'Burpee', definition: 'берпи' },
			{ term: 'BW (BWT, Body weight)', definition: 'вес тела' },
			{ term: 'C-F', definition: '' },
			{ term: 'Clean', definition: 'взятие на грудь' },
			{ term: 'Clean & Jerk', definition: 'взятие на грудь и толчек' },
			{
				term: 'CFT: CrossFit Total',
				definition: 'тест состоящий из приседания, жима и становой тяги',
			},
			{ term: 'Chest To Bar Pull-ups', definition: 'подтягивания до груди' },
			{
				term: 'CrossFit',
				definition:
					'кроссфит, система функционального тренинга, основанная на постоянно варьируемых функциональных движениях, выполняемых с высокой интенсивностью',
			},
			{
				term: 'Dead Bug',
				definition:
					'упражнение, в котором лежащий на спине человек направляет вытянутые руки и ноги в потолок и опускает одновременно разноименные руку и ногу, парами, по очереди - сперва правую руку и левую ногу, затем наоборот',
			},
			{
				term: 'Death by…',
				definition:
					'последовательность, при которой в первую минуту выполняешь 1 повтор, во вторую 2 повтора, в третью 3, и т.д., пока укладываешься в отведенную минуту',
			},
			{ term: 'Dip', definition: 'отжимания на брусьях' },
			{ term: 'Dead Lift', definition: 'становая тяга' },
			{ term: 'Double-Unders', definition: 'двойные прыжки со скакалкой' },
			{ term: 'Dumbbell', definition: 'гантеля' },
			{
				term: 'EMOM',
				definition:
					'Every Min Of the Min / выполнять упражнение каждую минуту в течение N минут',
			},
			{ term: 'Front Squat', definition: 'приседания со штангой на груди' },
			{ term: 'False Grip', definition: 'глубокий хват на кольцах' },
			{ term: 'Floor Wipers', definition: 'полотёр' },
			{ term: 'G-H', definition: '' },
			{
				term: 'GPP: General physical preparedness',
				definition: 'общая физическая подготовка (ОФП)',
			},
			{
				term: 'GHD: Glute-Ham Developer',
				definition: 'тренажер поясница-пресс',
			},
			{
				term: 'Goblet squat',
				definition: 'приседания с удержанием отягощения перед собой',
			},
			{ term: 'Hammer Slam', definition: 'удары кувалдой' },
			{
				term: 'Handstand Push-up',
				definition: 'отжимания в стойке на руках (вниз головой)',
			},
			{ term: 'Hang Power Clean Down', definition: 'взятие на грудь с виса' },
			{ term: 'Hang Power Snatch', definition: 'рывок с виса' },
			{ term: 'Hip Thrust', definition: 'подъемы таза со штангой на бедрах' },
			{
				term: 'Hollow Rock',
				definition:
					'качели (одновременное поднятие рук и ног в положении лежа на животе и раскачивание)',
			},
			{ term: 'Hook Grip', definition: 'хват штанги в замок' },
			{
				term: 'Hang Power Clean Up',
				definition: 'взятие на грудь с виса (выше колен)',
			},
			{
				term: 'Hand-release Push Ups',
				definition: 'отжимания с отрывом ладоней',
			},
			{ term: 'Hand Stand', definition: 'стойка на руках' },
			{ term: 'Hand stand walk', definition: 'ходьба на руках' },
			{
				term: 'Hyperextension',
				definition:
					'гиперэкстензии, упражнение для развития выпрямителей спины, сгибателей бедра и ягодичных мышц',
			},
			{ term: 'J-L', definition: '' },
			{
				term: 'Jerk',
				definition: 'толчок (полный цикл — взятие на грудь и толчок)',
			},
			{ term: 'Kettlebell', definition: 'гиря' },
			{ term: 'Knees To Elbows', definition: 'колени к локтям' },
			{ term: 'Kettlebell Swing', definition: 'махи гирей' },
			{
				term: 'Kipping Pull-ups',
				definition: 'подтягивания киппингом, с раскачкой',
			},
			{ term: 'L-hold', definition: 'L-фиксирование уголком' },
			{ term: 'L-Pull-up', definition: 'L-подтягивание уголком' },
			{ term: 'Lunges', definition: 'выпады' },
			{ term: 'M-O', definition: '' },
			{
				term: 'Man Maker',
				definition:
					'комплекс упражнений тренирует мышцы груди, спину, ноги, плечи и ягодицы, включает армейский жим, приседания с гирей над головой, взятие на грудь, мельницу и рывок, упражнения выполняются без отдыха',
			},
			{ term: 'Medicine Ball', definition: 'медбол' },
			{
				term: 'Medicine Ball Cleans',
				definition: 'взятие на грудь с медболом',
			},
			{
				term: 'MetCon: Metabolic Conditioning workout',
				definition: 'метаболическая тренировка (тренировка на выносливость)',
			},
			{ term: 'Military press', definition: 'армейский жим' },
			{ term: 'Muscle-up', definition: 'выход силой, выход на кольцах' },
			{
				term: 'Overhead Squat',
				definition: 'приседание со штангой над головой',
			},
			{ term: 'On-Ramp', definition: 'кроссфит-тренировки для начинающих' },
			{ term: 'P-R', definition: '' },
			{
				term: 'Pd: Pood',
				definition:
					'единица измерения веса, 1 пуд = 16 кг, используется для измерения веса гири',
			},
			{ term: 'Personal Record/Best', definition: 'личный рекорд' },
			{ term: 'Power Snatch', definition: 'силовой рывок' },
			{ term: 'Plank', definition: 'упражнение "планка"' },
			{ term: 'Plyo Push-Up', definition: 'плиометрические отжимания' },
			{ term: 'Pose Method of Running', definition: 'позный метод бега' },
			{ term: 'Power Clean', definition: 'силовое взятие на грудь' },
			{ term: 'Push Jerk', definition: 'швунг толчковый' },
			{ term: 'Push Press', definition: 'швунг жимовой' },
			{ term: 'Pull-ups', definition: 'подтягивания' },
			{ term: 'Push-ups', definition: 'отжимания' },
			{ term: 'Reverse Crunch', definition: 'обратные скручивания' },
			{ term: 'Reverse Row', definition: 'тяга в наклоне' },
			{
				term: 'Rounds for time',
				definition:
					'выполнить N раундов на время (5RFT — пять раундов на время)',
			},
			{
				term: 'Rx',
				definition:
					'as prescribed; as written; WOD done without any adjustments / WOD выполнен без масштабирования, как написано',
			},
			{ term: 'Ring Dips', definition: 'отжимания на кольцах' },
			{ term: 'Rope Climb', definition: 'лазание по канату' },
			{ term: 'Rep: Repetition', definition: 'повтор' },
			{
				term: 'RM/1RM: Repetition maximum',
				definition: 'максимальный вес на 1 повторение',
			},
			{ term: 'Row', definition: 'гребля' },
			{ term: 'Rope Jumping', definition: 'прыжки со скакалкой' },
			{ term: 'SA: Single Arm', definition: 'одной рукой' },
			{
				term: 'Scapula Pull-ups',
				definition: 'подтягивания с использованием лопаток',
			},
			{ term: 'Snatch', definition: 'рывок' },
			{ term: 'Sled Drag', definition: 'тащить санки' },
			{ term: 'Split Jerk', definition: 'раздельный толчок' },
			{ term: 'Split Squat', definition: 'раздельные приседания' },
			{ term: 'Sqt: Squat', definition: 'приседания' },
			{ term: 'Stability Ball', definition: 'мяч для фитнеса' },
			{
				term: 'Tabata',
				definition:
					'круговая тренировка, состоящая из 8-ми 20-секундных интервалов с 10-секундным отдыхом',
			},
			{ term: 'Tire Flip', definition: 'переворот шины' },
			{ term: 'Thruster', definition: 'приседания с отжиманием' },
			{
				term: 'Toes To Bar',
				definition: 'достать пальцами ног до перекладины',
			},
			{ term: 'WOD: Workout of the Day', definition: 'тренировка дня' },
			{
				term: 'Wall Ball',
				definition: 'мяч который бросают в стену',
			},
			{ term: 'Wall Ball Shots', definition: 'броски медбола' },
			{ term: 'Wall Walk', definition: 'ходьба по стене' },
			{ term: 'Weighted Pull-ups', definition: 'подтягивания с отягощением' },
			{ term: 'Weighted Push-ups', definition: 'отжимания с отягощением' },
			{ term: 'Z-Press', definition: 'жим над головой сидя' },
		]

		await queryInterface.bulkInsert('CrossfitTerms', crossfitTerms)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('CrossfitTerms', null, {})
	},
}
