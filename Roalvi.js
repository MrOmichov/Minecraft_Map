var Roalvi = [
	'[Рав] Ох, стар я стал, не могу как раньше - вплавь.',
	'[Кейн] Привет, Рав.',
	'[Рав] Привет, Кейн.',
	'[Кейн] Ты не видел, кто это сделал?',
	'[Рав] Нет, но возможно рыбак видел. Он всё утро был на пляже.',
	'[Кейн] Спасибо, Рав.'
	]

function interact(event){
	var world = event.npc.getWorld()
	var npc = event.npc
    var player = event.player
    var dialogControl = world.getStoreddata().get('dialogControl')
	var dialogNumber = world.getStoreddata().get('dialogNumber')
	switch(dialogControl) {
		case 'Roalvi':
			if (dialogNumber < Roalvi.length){
				player.message(Roalvi[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == Roalvi.length - 1) {
					world.getStoreddata().put('dialogControl', 'Rybak')
					world.getStoreddata().put('dialogNumber', 0)
				}
			}
			break;
	}
}