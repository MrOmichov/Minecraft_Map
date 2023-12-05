var RybakDialog = [
	'[Кейн] Здравствуйте.', 
    '[Рыбак] О, здравствуйте, это вы тот детектив, который приплыл вчера? ',
	'[Кейн] Да, это я. Случилось происшествие с кораблём, его видимо задел другой корабль, когда отплывал.',
	'[Рыбак] А, вот когда я ложился спать какой-то корабль проплывал вдоль берега.',
	'[Кейн] А вы разглядели преступника?',
	'[Рыбак] Нет. Вы можете спросить людей, живущих дальше.',
	'[Кейн] Хорошо, спасибо.',
	]

function init(event){
	event.npc.getAi().setAnimation(2)
	var world = event.npc.getWorld()
}

function interact(event){
    var world = event.npc.getWorld()
	var npc = event.npc
    var player = event.player
    var dialogControl = world.getStoreddata().get('dialogControl')
	var dialogNumber = world.getStoreddata().get('dialogNumber')
	switch(dialogControl) {
		case 'Rybak':
			player.message('[Кейн] Нужно принести рыбы. Её запах должен разбудить его. Придёться поймать. Удочка, наверное, есть в сундуке.')
			world.getStoreddata().put('dialogControl', 'GubernatorFish')
			world.getStoreddata().put('dialogNumber', 0)
			world.setBlock(-602, 29, -488, 'minecraft:redstone_block', 1)
			break;
		case 'RybakDialog':
			if (dialogNumber < RybakDialog.length) {
				player.message(RybakDialog[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == RybakDialog.length - 1) {
					world.getStoreddata().put('dialogControl', 'Smail')
					world.getStoreddata().put('dialogNumber', 0)
				}
			}
			break;
	}
}