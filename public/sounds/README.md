# 節拍器音效文件

這個目錄用於存放節拍器的音效文件。您需要添加以下兩個音效文件：

1. `strong-beat.mp3` - 強拍音效
2. `weak-beat.mp3` - 弱拍音效

您可以從以下來源獲取免費的節拍器音效：

1. [Freesound](https://freesound.org/search/?q=metronome)
2. [SoundBible](https://soundbible.com/search.php?q=metronome)
3. [Zapsplat](https://www.zapsplat.com/sound-effect-category/metronome/)

或者，您可以使用簡單的音頻編輯工具（如 Audacity）創建自己的音效。

## 音效文件格式

- 格式：MP3
- 持續時間：短（約 50-100 毫秒）
- 強拍音效應該比弱拍音效更響亮或音調更高

## 示例命令

如果您有音效文件，可以使用以下命令將它們複製到此目錄：

```bash
cp path/to/your/strong-beat.mp3 public/sounds/
cp path/to/your/weak-beat.mp3 public/sounds/
```

或者，您可以使用以下命令從網絡下載音效文件（需要 curl）：

```bash
curl -o public/sounds/strong-beat.mp3 https://example.com/path/to/strong-beat.mp3
curl -o public/sounds/weak-beat.mp3 https://example.com/path/to/weak-beat.mp3
```

請確保在運行應用程序之前添加這些音效文件，否則節拍器將無法播放聲音。