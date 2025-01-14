"use client";

import { useRef, useEffect, useCallback } from 'react';
import { Bold, Italic, List, ListOrdered, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

interface EditorCommand {
  icon: React.ElementType;
  command: string;
  title: string;
}

const EDITOR_COMMANDS: EditorCommand[] = [
  { icon: Bold, command: 'bold', title: 'Bold' },
  { icon: Italic, command: 'italic', title: 'Italic' },
  { icon: List, command: 'insertUnorderedList', title: 'Bullet List' },
  { icon: ListOrdered, command: 'insertOrderedList', title: 'Numbered List' },
];

const ALIGNMENT_COMMANDS: EditorCommand[] = [
  { icon: AlignLeft, command: 'justifyLeft', title: 'Align Left' },
  { icon: AlignCenter, command: 'justifyCenter', title: 'Align Center' },
  { icon: AlignRight, command: 'justifyRight', title: 'Align Right' },
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const execCommand = useCallback((command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  }, []);

  const EditorButton = useCallback(({ command, icon: Icon, title }: EditorCommand) => (
    <button
      type="button"
      onClick={() => execCommand(command)}
      className="p-2 hover:bg-neutral-200 rounded transition-colors"
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  ), [execCommand]);

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="border-b bg-neutral-50 p-2 flex gap-2 flex-wrap">
        <div className="flex gap-2">
          {EDITOR_COMMANDS.map((cmd) => (
            <EditorButton key={cmd.command} {...cmd} />
          ))}
        </div>
        
        <div className="w-px h-6 bg-neutral-300 mx-1 self-center" />
        
        <div className="flex gap-2">
          {ALIGNMENT_COMMANDS.map((cmd) => (
            <EditorButton key={cmd.command} {...cmd} />
          ))}
        </div>
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[200px] focus:outline-none prose prose-neutral max-w-none"
        data-testid="rich-text-editor"
      />
    </div>
  );
}