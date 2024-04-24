import { Card } from './components/card/Card';
import { ZodAndControlledInputsForm } from './components/samples/ZodAndControlledInputsForm';

function App() {
  return (
    <>
      <div className="flex justify-center p-8">
        <main className="w-full max-w-2xl">
          <Card>
            <ZodAndControlledInputsForm />
          </Card>
        </main>
      </div>
    </>
  );
}

export default App;
