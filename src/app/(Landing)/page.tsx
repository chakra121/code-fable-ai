import Navbar from "@/components/Navbar";
import Aurora from "@/components/ui/AuroraBG";
import SplitText from "@/components/ui/SplitTextEffect";
import TextType from "@/components/ui/TextType";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Aurora component as the background */}
      <div className="absolute inset-0">
        <Aurora
          colorStops={["#00FFC6", "#FFD6A5", "#C084FC"]}
          blend={0.5}
          amplitude={1.5}
          speed={1.0}
        />
      </div>

      {/* Navbar sits on top of the Aurora background */}
      <Navbar />

      {/* Content area, ensuring it's above the Aurora background */}
      <div className="relative z-10 flex h-screen items-center justify-center">
        {/* Your main content goes here. For example, a hero section. */}
        <h1 className="drop-shadow-lg text-center flex flex-col items-center">
          {" "}
          {/* Added items-center for horizontal centering of children */}
          <SplitText
            text="Code Fable AI"
            // Adjusted text sizes for better responsiveness and prominence
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6" // Added mb-6 for spacing below
            delay={10}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={null}
          />
          <TextType
            text={[
              "An AI-Powered Storytelling Coding Tutor",
              "Where Every Line of Code Tells a Story, in Your Language",
            ]}
            // Adjusted typing and deleting speeds for a smoother, more natural feel
            typingSpeed={65} // Increased from 75, making it slightly slower and more readable
            initialDelay={2000}
            deletingSpeed={50} // Slightly slower deleting
            loop={true}
            hideCursorWhileTyping={false}
            cursorBlinkDuration={0.5}
            pauseDuration={2500}
            showCursor={true}
            cursorCharacter="_"
            variableSpeed={false} // Set to false for consistent typing speed, or adjust to a smaller range if needed
            onSentenceComplete={null}
            textColors={["#CCCCCC", "#CCCCCC"]} // Colors for the text
            // Added Tailwind classes for styling the text
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl" // Added mt-4 for spacing above, and text color
          />
        </h1>
      </div>
    </div>
  );
}
