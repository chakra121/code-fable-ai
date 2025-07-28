import Navbar from "@/components/Navbar";
import Aurora from "@/components/ui/AuroraBG";
import SplitText from "@/components/ui/SplitTextEffect";
import TextType from "@/components/ui/TextType";
import Link from "next/link";

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
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        {/* Your main content goes here. For example, a hero section. */}
        <h1 className="drop-shadow-lg text-center flex flex-col items-center">
          {/* Added items-center for horizontal centering of children */}
          <SplitText
            text="Code Fable AI"
            // Adjusted text sizes for better responsiveness and prominence
            className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6" // Added mb-6 for spacing below
            delay={150}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={undefined}
          />
          <TextType
            text={[
              "An AI-Powered Storytelling Coding Tutor",
              "Where Every Line of Code Tells a Story, in Your Language",
            ]}
            // Adjusted typing and deleting speeds for a smoother, more natural feel
            typingSpeed={65} // Increased from 75, making it slightly slower and more readable
            initialDelay={3000}
            deletingSpeed={50} // Slightly slower deleting
            loop={true}
            hideCursorWhileTyping={false}
            cursorBlinkDuration={0.5}
            pauseDuration={2500}
            showCursor={true}
            cursorCharacter="_"
            variableSpeed={{ min: 65, max: 65 }} // Set min and max to the same value for consistent typing speed
            onSentenceComplete={undefined}
            textColors={["#CCCCCC", "#CCCCCC"]} // Colors for the text
            // Added Tailwind classes for styling the text
            className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-4 max-w-2xl" // Added mt-4 for spacing above, and text color
          />
        </h1>
        <div>
          <button className="bg-white text-black px-6 py-3 rounded-full shadow-lg ease-in transition-all duration-300 mt-7">
            <Link href={"/chat"} className="flex items-center gap-2">
              Get Started
              <svg
                width="11"
                style={{ transform: "translate(1px, -1px)" }}
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.70985 4.5H7.7804M7.7804 4.5V10.5705M7.7804 4.5L0.780396 11.5"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </Link>
          </button>
          <button className="text-white bg-transparent px-6 py-3 rounded-full shadow-lg ease-in transition-all duration-300 mt-4 ml-4">
            <Link href={""} className="flex items-center gap-2">
              Explore our AI
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24" // Standard viewBox for common icons
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                // Removed inline style for transform as this icon is a simple chevron
                // If you need rotation, consider adding a class or prop for it.
              >
                {/* Path for a simple chevron-right icon */}
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
