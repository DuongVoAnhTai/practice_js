const loremWords = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
    'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
    'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
    'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
    'accusamus', 'accusantium', 'doloremque', 'laudantium', 'totam', 'rem',
    'aperiam', 'eaque', 'ipsa', 'quae', 'ab', 'illo', 'inventore', 'veritatis',
    'et', 'quasi', 'architecto', 'beatae', 'vitae', 'dicta', 'explicabo', 'nemo',
    'ipsam', 'quia', 'voluptas', 'aspernatur', 'odit', 'aut', 'fugit'
];

const $ = document.querySelector.bind(document)

const sliderParagraph = $('.slider-paragraph')
const slideWord = $('.slider-word')
const dropdown = $('.dropdown')
const checkbox = $('.includeHtml')
const output = $('.output')

sliderParagraph.addEventListener('input', function() {
    const value = this.value
    this.nextElementSibling.textContent = `${value} paragraph${value > 1 ? 's' : ''}`
})

slideWord.addEventListener('input', function() {
    const value = this.value
    this.nextElementSibling.textContent = `${value} words`
})

function generateRandomWords(count) {
    const words = []
    for(let i = 0; i < count; i++) {
        const randomWord = loremWords[Math.floor(Math.random() * loremWords.length)]
        words.push(randomWord)
    }
    return words
}

function capitalizeSentence(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

function generateLorem() {
    const paragraphs = sliderParagraph.value
    const word = slideWord.value
    const tag = dropdown.value
    const includeHtml = checkbox.checked

    let result = ''
    
    for(let i = 0; i < paragraphs; i++) {
        const words = generateRandomWords(word)
        let paragraph = words.join('')
        
        const sentences = []
        let currentSentence = []
        const sentenceLength = Math.floor(Math.random() * 10) + 8

        for(let j = 0; j < words.length; j++) {
            currentSentence.push(words[j])

            if(currentSentence.length >= sentenceLength || j  === words.length - 1) {
                let sentence = currentSentence.join(' ')
                sentence = capitalizeSentence(sentence) + '. '
                sentences.push(sentence)
                currentSentence = []
            }
        }

        paragraph = sentences.join('')

        if(includeHtml) {
            paragraph = `<${tag}>${paragraph}</${tag}>`
        }

        result += paragraph
        
        if(i < paragraphs - 1) {
            result += includeHtml ? '\n\n' : '\n\n'
        }
        
        output.textContent = result
        output.classList.add('has-content')

        if(includeHtml) {
            template = `
                <div style="margin-bottom: 20px; padding: 10px; background: #f0f8ff; border-left: 4px solid #2196F3;">
                    <strong>HTML Code:</strong>
                </div>

                <pre style="white-space: pre-wrap; font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 4px;">${result.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
                
                <div style="margin: 20px 0; padding: 10px; background: #f0f8ff; border-left: 4px solid #2196F3;">
                    <strong>Rendered Result:</strong>
                </div>
                
                <div style="border: 1px solid #ddd; padding: 15px; border-radius: 4px;">
                    ${result}
                </div>
            `
            output.innerHTML = template
        }
    } 
}
