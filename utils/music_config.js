module.exports = client => {

    const { embed } = client

    const { DisTube } = require("distube");
    const { SpotifyPlugin } = require("@distube/spotify");
    const { SoundCloudPlugin } = require("@distube/soundcloud");
    const { YtDlpPlugin } = require("@distube/yt-dlp");

    client.distube = new DisTube(client, {
      searchSongs: 0, /// SET TO 5 FOR ENABLE SEARCH MODE!
      searchCooldown: 30,
      leaveOnEmpty: true,
      emptyCooldown: 60,
      leaveOnFinish: true,
      leaveOnStop: true,
      youtubeDL: false,
      plugins: [
        new SoundCloudPlugin(),
        new SpotifyPlugin({
          emitEventsAfterFetching: true,
        }),
        new YtDlpPlugin(),
      ],
    });

    const status = queue =>
  `Ses: \`%\` | Filtre: \`${queue.filters.names.join(', ') || 'Kapalı'}\` | Döngü: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'Tüm Liste' : 'Şarkı') : 'Kapalı'
  }\` | Otomatik Oynatma: \`${queue.autoplay ? 'Açık' : 'Kapalı'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({embeds:[embed("Şarkı Oynatılıyor",`[${song.name}](${song.url}) Adlı Şarkı Oynatılıyor`,"BLURPLE")]})
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send({embeds:[embed("Şarkı Eklenmiştir",`[${song.name}](${song.url}) Adlı Şarkı ${song.user} Tarafından Eklenmiştir`,"BLURPLE")]})
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send({embeds:[embed("",`Listeye Eklendi ${playlist.name} Listede Bulunana Şarkı Sayısı (${playlist.songs.length})`,"BLURPLE")]})
  )
  .on('empty', queue => queue.textChannel.send({embeds:[embed("",`Kanalda Kimse Bulunmadığı İçin Müzik Oynatılamadı`,"RED")]}))
  .on('searchNoResult', (message, query) =>
    message.channel.send({embeds:[embed("",`${query} Adlı Arama Sonucu İle İlgili Bir Sonuç Bulunamadı`,"RED")]})
  )
  .on('finish', queue => queue.textChannel.send({embeds:[embed("","Şarkınız Sona Erdi","BLURPLE")]}))
}
