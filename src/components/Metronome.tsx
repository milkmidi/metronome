import React, { useState, useEffect, useRef } from 'react';
import {
  IMetronomeState,
  TimeSignature,
  METRONOME_CONSTANTS,
} from '../types/metronome';
import { MetronomeAudioEngine } from '../utils/metronome-audio';
import SpeedControl from './metronome/SpeedControl';
import TimeSignatureControl from './metronome/TimeSignatureControl';
import MetronomeDisplay from './metronome/MetronomeDisplay';
import MetronomeControls from './metronome/MetronomeControls';

function Metronome(): React.ReactElement {
  // 使用定義的介面作為狀態類型
  const [state, setState] = useState<IMetronomeState>({
    isPlaying: false,
    bpm: METRONOME_CONSTANTS.DEFAULT_BPM,
    timeSignature: METRONOME_CONSTANTS.DEFAULT_TIME_SIGNATURE,
    currentBeat: 0,
  });

  // 使用 useRef 保存音頻引`擎實例
  const audioEngineRef = useRef<MetronomeAudioEngine | null>(null);

  // 初始化音頻引擎
  useEffect(() => {
    audioEngineRef.current = new MetronomeAudioEngine();

    // 設置節拍回調函數
    audioEngineRef.current.setOnBeatCallback((beat) => {
      setState((prev) => ({ ...prev, currentBeat: beat }));
    });

    return () => {
      // 清理資源
      if (audioEngineRef.current) {
        audioEngineRef.current.stop();
      }
    };
  }, []);

  // 處理播放狀態變化
  useEffect(() => {
    if (!audioEngineRef.current) return;

    if (state.isPlaying) {
      audioEngineRef.current.start(state.bpm, state.timeSignature);
    } else {
      audioEngineRef.current.stop();
    }
  }, [state.isPlaying, state.bpm, state.timeSignature]);

  // 更新瀏覽器標題以反映速度和拍子
  useEffect(() => {
    if (state.isPlaying) {
      document.title = `節拍器 - 速度: ${state.bpm} BPM, 拍子: ${state.timeSignature}`;
    } else {
      document.title = '節拍器';
    }
  }, [state.isPlaying, state.bpm, state.timeSignature]);

  // 處理速度變化
  const handleSpeedChange = (bpm: number): void => {
    setState((prev) => ({ ...prev, bpm }));
  };

  // 處理拍子變化
  const handleTimeSignatureChange = (timeSignature: TimeSignature): void => {
    setState((prev) => ({
      ...prev,
      timeSignature,
      currentBeat: 0, // 重置當前拍子位置
    }));
  };

  // 處理播放/停止
  const handlePlayToggle = (): void => {
    setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  return (
    <div className="metronome-container p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">節拍器</h1>

      <MetronomeDisplay
        currentBeat={state.currentBeat}
        timeSignature={state.timeSignature}
        isPlaying={state.isPlaying}
      />

      <div className="mt-6">
        <SpeedControl
          bpm={state.bpm}
          onSpeedChange={handleSpeedChange}
        />
      </div>

      <div className="mt-6">
        <TimeSignatureControl
          timeSignature={state.timeSignature}
          onTimeSignatureChange={handleTimeSignatureChange}
        />
      </div>

      <div className="mt-6">
        <MetronomeControls
          isPlaying={state.isPlaying}
          onPlayToggle={handlePlayToggle}
        />
      </div>
    </div>
  );
}

export default Metronome;
