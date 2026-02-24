# -*- coding: utf-8 -*-
import re

improved_footer_css = """
/* Footer */
.footer {
  padding: 80px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 80px;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
  margin-bottom: 48px;
}

@media (max-width: 968px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}

@media (max-width: 568px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .footer .container {
    padding: 0 20px;
  }
}

.footer-section h4 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #f1f5f9;
}

.footer-section p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.7;
}

.footer-section a {
  display: block;
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.footer-section a:hover {
  color: #6366f1;
  transform: translateX(4px);
}

.footer-bottom {
  text-align: center;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #64748b;
  font-size: 14px;
}
"""

# Process all module files
for i in range(1, 13):
    filename = f'pages/module-{i}.html'
    
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove old footer CSS
        content = re.sub(r'/\* Footer \*/.*?\.footer-bottom \{[^}]+\}', '', content, flags=re.DOTALL)
        
        # Add improved CSS before </style>
        content = content.replace('</style>', f'{improved_footer_css}\n</style>')
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'Improved styles in {filename}')
    except Exception as e:
        print(f'Error with {filename}: {e}')

print('Done! Footer styles improved on all modules.')
