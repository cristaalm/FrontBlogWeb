/**
 * v0 by Vercel.
 * @see https://v0.dev/t/T7v7bqhETIj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="min-h-screen bg-[#e0f7fa]">
      <div className="flex h-full">
        <aside className="w-60 bg-[#b2ebf2] p-5">
          <div className="flex items-center space-x-2 mb-6">
            <FlagIcon className="h-8 w-8" />
            <span className="font-bold">Logo</span>
          </div>
          <nav className="space-y-2">
            <div className="flex items-center space-x-2">
              <InboxIcon className="h-5 w-5" />
              <Select>
                <SelectTrigger id="entries">
                  <SelectValue>Entradas</SelectValue>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="add-new">Añadir nueva</SelectItem>
                  <SelectItem value="categories">Categorías</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <UsersIcon className="h-5 w-5" />
              <span>Usuarios</span>
            </div>
          </nav>
        </aside>
        <main className="flex-1 p-5">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">Añadir nueva entrada</h1>
            <span>¡Hola, Admin!</span>
          </header>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <div className="mb-4">
                <label className="block mb-2 font-medium" htmlFor="title">
                  Título de Entrada
                </label>
                <Input id="title" placeholder="Ingrese título" />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium" htmlFor="category">
                  Categorías
                </label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleccione categoría..." />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="category1">Categoría 1</SelectItem>
                    <SelectItem value="category2">Categoría 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium" htmlFor="description">
                  Descripción
                </label>
                <Textarea id="description" placeholder="Ingrese descripción" />
              </div>
              <div className="mb-4">
                <Button className="bg-[#80deea]">Previsualizar</Button>
              </div>
              <div className="mb-4">
                <Button className="bg-[#4dd0e1]">Imagen Destacada</Button>
              </div>
              <div>
                <Button className="bg-[#26c6da]">Guardar Entrada</Button>
              </div>
            </div>
            <div>
              <div className="border p-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">Previsualización</h2>
                  <SettingsIcon className="h-6 w-6" />
                </div>
                <div className="flex space-x-2 mb-2">
                  <Button variant="ghost">B</Button>
                  <Button variant="ghost">I</Button>
                  <Button variant="ghost">U</Button>
                  <Button variant="ghost">S</Button>
                  <div className="flex-1">
                    <Input placeholder="style" />
                  </div>
                  <Button variant="ghost">
                    <AlignLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">
                    <AlignCenterIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">
                    <AlignRightIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost">
                    <FileIcon className="h-4 w-4" />
                  </Button>
                </div>
                <div className="border-t pt-2">
                  <div className="h-48 bg-[#b2ebf2]" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function AlignCenterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="17" x2="7" y1="12" y2="12" />
      <line x1="19" x2="5" y1="18" y2="18" />
    </svg>
  )
}


function AlignLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="15" x2="3" y1="12" y2="12" />
      <line x1="17" x2="3" y1="18" y2="18" />
    </svg>
  )
}


function AlignRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="21" x2="3" y1="6" y2="6" />
      <line x1="21" x2="9" y1="12" y2="12" />
      <line x1="21" x2="7" y1="18" y2="18" />
    </svg>
  )
}


function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}


function FlagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}


function InboxIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
