var Aid = [
	'[Аид] О, офигеть. Привет Кейн, не ожидал тебя увидеть в отеле. Ты вчера ночью заезжал?',
	'[Кейн] Ого, Аид, давно не виделись! Да. Решил отдохнуть на ваших островах, говорят людей немного, а места красивые, в общем, как я люблю.',
	'[Аид] Крутяк! Я вот тоже зря время не терял, решил на ресепшене подрабатывать.',
	'[Кейн] Отлично. Так, мне к губернатору надо на завтрак. Ещё может увидимся.',
	'[Аид] К губернатору? Понятно. Увидимся тогда!'
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