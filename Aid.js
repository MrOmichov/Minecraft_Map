var Aid = [
	'[Аид] О, привет, Кейн. Ты вчера ночью приехал? А-то я тебя вчера не видел, а ночью я не работаю.', 
	'[Кейн] О привет, Аид. Да, я вчера ночью заехал - меня губернатор проводил.', 
	'[Аид] Хорошо.', 
	'[Кейн] Я пойду прогуляюсь.' 
]

function interact(event){
    var world = event.npc.getWorld()
	var npc = event.npc
    var player = event.player
    var dialogControl = world.getStoreddata().get('dialogControl')
	var dialogNumber = world.getStoreddata().get('dialogNumber')
	switch(dialogControl) {
		case 'Aid':
			if (dialogNumber < Aid.length){
				player.message(Aid[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == Aid.length - 1) {
					world.setBlock(-366, 47, -449, 'minecraft:redstone_block', 1)
					world.getStoreddata().put('dialogNumber', 0)
					world.getStoreddata().put('dialogControl', 'HaldEffect')
				}
			}
			break;
	}
}