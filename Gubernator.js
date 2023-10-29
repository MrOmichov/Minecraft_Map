var welcome = [
	'[Губернатор] Добрый вечер, детектив. Добро пожаловать на наш остров!',
	'[Кейн] Добрый.',
	'[Губернатор] Как доехали?',
	'[Кейн] Отлично! Погода прекрасная. Меня даже не укачало.',
	'[Губернатор] Тогда позвольте я Вас провожу в Ваш номер.',
	'[Кейн] Хорошо. Отправляемся.'
	]
	
var hotel = [
	'[Губернатор] Ну вот. Устраивайтесь по-удобней, ложитесь спать. А завтра приходите ко мне утром на завтрак. До свидания.',
	'[Кейн] Обязательно приду. Спокойной ночи. До свидания.'
]

var breakfast = [
	'[Кейн] Здравствуйте.', 
    '[Губернатор] Привет, Кейн, знакомся. Вон там сидит Асокан, мой давний друг и сослуживец. Асокан - это Кейн, известный детектив',
	'[Асокан] Рад знакомству, Кейн, я наслышан о вашей деятельности.',
	'[Губернатор] Как спалось?',
	'[Кейн] Всё хорошо - спал беспробудно.',
	'[Губернатор] Ну тогда, давайте садиться за стол - будем завтракать.',
	]

function interact(event){
    var world = event.npc.getWorld()
	var npc = event.npc
    var player = event.player
    var dialogControl = world.getStoreddata().get('dialogControl')
	var dialogNumber = world.getStoreddata().get('dialogNumber')
	switch(dialogControl) {
		case 'welcome':
			if (dialogNumber < welcome.length){
				player.message(welcome[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == welcome.length - 1) {
					//npc.navigateTo(-364, 31, -484, 1)
					npc.getTimers().start(1, 20 * 1, false)
				}
			}
			break;
		case 'hotel':
			if (dialogNumber < hotel.length){
				player.message(hotel[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == hotel.length - 1) {
					//npc.navigateTo(-364, 31, -484, 1)
					npc.getTimers().start(2, 20 * 1, false)
				}
			}
			break;
		case 'breakfast':
			if (dialogNumber < breakfast.length){
				player.message(breakfast[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == breakfast.length - 1) {
					world.getStoreddata().put('dialogControl', '')
					world.getStoreddata().put('dialogNumber', 0)
					if (!player.hasActiveQuest(1))
						player.startQuest(1)
				}
			}
			break;
	}
}

function timer(event){
	var npc = event.npc
	var world = event.npc.getWorld()
	var id = event.id
	switch(id){
		case 1:
			world.setBlock(-364, 29, -497, 'minecraft:redstone_block', 1)
			world.getStoreddata().put('dialogControl', 'hotel')
			world.getStoreddata().put('dialogNumber', 0)
			break;
		case 2:
			npc.setPosition(-355, 33, -416)
			world.getStoreddata().put('dialogControl', 'Aid')
			world.getStoreddata().put('dialogNumber', 0)
			break;
	}
}