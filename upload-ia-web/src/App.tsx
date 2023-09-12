import { Github, FileVideo2, Upload } from 'lucide-react';
import { Button } from "./components/ui/button";
import { Separator } from '@radix-ui/react-separator';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';

export function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ia</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com ❤️ por Luan Prates
          </span>

          
          <Separator orientation='vertical' className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2"/>
            GitHub
          </Button>
        </div>
      </div>
      <main className='flex-1 p-6 flex gap-6 '>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
          <Textarea 
            className='resize-none p-4 leading-relaxed'
            placeholder='Inclua o prompt para a IA...'
          />
          <Textarea 
            className='resize-none p-4 leading-relaxed'
            placeholder='Resultado gerado pela IA...' 
            readOnly 
          />
          </div>
          <p className='text-sm text-muted-foreground'>Lembre-se: você pode 
          utilizar a variável <code className='text-orange-400'>{'{transcription}'}</code> no seu prompt para adicionar o 
          conteúdo da transcrição do video selecionado.</p>
        </div>
        <aside className='w-80 space-y-6'>
          <form className='space-y-6'>
            <label 
            htmlFor="video"
            className='flex border rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
            >
              <FileVideo2 className='w-4 h-4' />
              Selecione um vídeo
            </label>
            <input type="file" id='video' accept='video/mp4' className='sr-only'/>
            <Separator />
            <div className='space-y-2'>
              <Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
              <Textarea
              id='transcription_prompt'
              className='h-20 leading-relaxed resize-none'
              placeholder='Inclua palavras-chave mencionadas no vídeo separadas por (,)'
              />
            </div>
            <Button type='submit' className='w-full'>
              Carregar vídeo 
              <Upload className='w-4 h-4 ml-2'/>
            </Button>
          </form>

          <Separator />

          <form className='space-y-6'>
            <div className='space-y-2'>
              <Label>Modelo</Label>
            </div>
          </form>
        </aside>
      </main>
    </div>
  )
}


