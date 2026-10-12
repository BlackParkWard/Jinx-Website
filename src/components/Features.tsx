const Features = () => {
  return (
    <section className="w-full flex flex-col gap-8 px-4 py-16">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 items-center justify-center p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Feature 1</h3>         
        <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Feature 2</h3>
                <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center p-4 border rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Feature 3</h3>
                <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        </div>
    </section>
  )
}

export default Features;