var welcome = [
	'[Губернатор] Ну здравствуйте мистер Кейн. Неожиданно, что вы решили посетить наши скромные острова!',
	'[Кейн] Да, здравствуйте, просто отдыхать нужно даже детективам, сами понимаете.',
	'[Губернатор] Как доехали?',
	'[Кейн] Прекрасно, меня даже не укачало.',
	'[Губернатор] Рад слышать, что ж, приехали вы поздновато, думаю вам надо сейчас обустроиться в нашем отеле, как думаете?',
	'[Кейн] Было бы славно, пока плыл я неплохо так устал.',
	'[Губернатор] Ну тогда давайте я вас провожу.'
	]
	
var hotel = [
	'[Губернатор] Вот, здесь и располагайтесь.',
	'[Кейн] Спасибо.',
	'[Губернатор] Завтра суббота. Приходите завтра ко мне до утреннего приёма на чашку чая, и вообще на завтрак.',
	'[Кейн] Хорошо, с радостью.',
	'[Кейн] Так, ну место мне уже нравится, даже стол не побитый, ладно, думаю сразу лягу.'
]

var breakfast = [
	'[Кейн] Здравствуйте.', 
    '[Губернатор] Привет, Кейн, знакомся. Вон там сидит Асокан, мой давний друг и сослуживец. Асокан - это Кейн, известный детектив.',
	'[Асокан] Рад знакомству, Кейн, я наслышан о вашей деятельности.',
	'[Губернатор] Как спалось?',
	'[Кейн] Всё хорошо - спал беспробудно.',
	'[Губернатор] Ну тогда, давайте садиться за стол - будем завтракать.',
	]
	
var GubernatorFish = [
    '[Губернатор] Ну, как дела, Кейн?',
	'[Кейн] Продвигаюсь. Рыбак спит как убитый. Я иду ловить рыбу, чтобы разбудить его.',
	'[Губернатор] Эх, знаю этого старого проказника. Хорошо, что я сразу прихватил рыбу. Вот, держи.',
	'[Кейн] Спасибо.',
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
					npc.navigateTo(-364, 31, -484, 1)
					npc.getTimers().start(1, 20 * 2, false)
				}
			}
			break;
		case 'hotel':
			if (dialogNumber < hotel.length){
				player.message(hotel[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == hotel.length - 2) {
					//npc.navigateTo(-364, 31, -484, 1)
					world.getStoreddata().put('dialogNumber', dialogNumber + 1)
					player.message(hotel[dialogNumber + 1])
					world.getStoreddata().put('dialogControl', 'Aid')
					npc.getTimers().start(2, 20 * 1, false)
				}
			}
			break;
		case 'breakfast':
			if (dialogNumber < breakfast.length){
				player.message(breakfast[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == breakfast.length - 1) {
					world.getStoreddata().put('dialogControl', 'Roalvi')
					world.getStoreddata().put('dialogNumber', 0)
					if (!player.hasActiveQuest(1)){
						player.startQuest(1)
						world.setBlock(-351, 29, -402, 'minecraft:redstone_block', 1)
					}
				}
			}
			break;
		case 'GubernatorFish':
			if (dialogNumber < GubernatorFish.length){
				player.message(GubernatorFish[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == GubernatorFish.length - 2) {
					npc.giveItem(player, world.createItem('minecraft:fish', 0, 1))
				}
				if (dialogNumber == GubernatorFish.length - 1) {
					world.getStoreddata().put('dialogControl', 'RybakDialog')
					world.getStoreddata().put('dialogNumber', 0)
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
			npc.clearNavigation()
			world.setBlock(-364, 29, -497, 'minecraft:redstone_block', 1)
			world.getStoreddata().put('dialogControl', 'hotel')
			world.getStoreddata().put('dialogNumber', 0)
			break;
		case 2:
			npc.setPosition(-355, 33, -416)
			world.getStoreddata().put('dialogNumber', 0)
			world.setBlock(-377, 47, -451, 'minecraft:redstone_block', 1)
			npc.executeCommand('/effect @p minecraft:blindness 5 3')
			npc.executeCommand('/effect @p minecraft:slowness 5 3')
			npc.getTimers().start(3, 20 * 5, false)
			break;
		case 3:
			npc.executeCommand('/effect @p clear')
			npc.executeCommand('/time set 450')
			break;
	}
}