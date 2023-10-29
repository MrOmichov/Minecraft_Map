var HaldEffect = [
	'[Эффект] О, привет, Кейн. А что ты здесь делаешь?', 
    '[Кейн] Привет, Эффект, здравствуй, Хэлд, а я вот детективом заделался, приехал сюда отдохнуть.',
	'[Хэлд] А мы, вот, работаем журналистами здесь. Навыки с Ютуба пригодились тут.',
	'[Эффект] Ну раз уж ты здесь с нами, то мог бы ты, пожалуйста, дать нам интервью?',
	'[Кейн] Хорошо, почему нет.',
	'[Хэлд] Итак, Сейчас я нахожусь рядом с известнейшим детективом по имени Кейн! На его счету сотни раскрытых преступлений и сотни пойманных преступников. Расскажите, в чём ваш секрет?',
	'[Кейн] Ну что ж, много лет расследований, и преступления будут раскрываться по щелчку пальца.',
	'[Хэлд] Да, с опытом приходит и успех. А зачем вы приехали к нам сюда?',
	'[Кейн] Я приехал отдохнуть. У вас мне здесь нравится.',
	'[Эффект] Спасибо за интервью, Кейн, до свидания.',
	'[Кейн] До свидания.',
	'[Эффект] Ну всё, записали.',
	'[Кейн] Отлично, я сейчас пойду к губернатору, а потом мы с вами ещё поболтаем!',
	'[Эффект] [Хэлд] Хорошо, мы не прощаемся.'
	]
  
function interact(event){
    var world = event.npc.getWorld()
	var npc = event.npc
    var player = event.player
    var dialogControl = world.getStoreddata().get('dialogControl')
	var dialogNumber = world.getStoreddata().get('dialogNumber')
	switch(dialogControl) {
		case 'HaldEffect':
			if (dialogNumber < HaldEffect.length){
				player.message(HaldEffect[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == HaldEffect.length - 1) {
					world.getStoreddata().put('dialogNumber', 0)
					world.getStoreddata().put('dialogControl', 'breakfast')
				}
			}
			break;
	}
}