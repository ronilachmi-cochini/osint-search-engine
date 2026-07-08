// OSINT Search Engine - Main Script

function generateVariations(term, type) {
    let variations = new Set();
    
    if (type === 'phone') {
        variations.add(term);
        variations.add(term.replace(/[^0-9]/g, ''));
        variations.add('+' + term.replace(/[^0-9]/g, ''));
        variations.add('0' + term.replace(/[^0-9]/g, '').slice(1));
        variations.add('+972' + term.replace(/[^0-9]/g, '').slice(1));
    }
    
    if (type === 'email') {
        variations.add(term);
        variations.add(term.toLowerCase());
        variations.add(term.split('@')[0]);
    }
    
    if (type === 'username') {
        variations.add(term);
        variations.add(term.toLowerCase());
        variations.add(term.toUpperCase());
        variations.add(term.replace(/[_-]/g, ''));
        variations.add(term.replace(/[_-]/g, '_'));
        variations.add(term.replace(/[_-]/g, '-'));
    }
    
    if (type === 'name') {
        let parts = term.split(' ');
        variations.add(term);
        variations.add(term.toLowerCase());
        if (parts.length > 1) {
            variations.add(parts.join('_'));
            variations.add(parts.join('-'));
            variations.add(parts[0]);
            variations.add(parts[parts.length - 1]);
        }
    }
    
    return Array.from(variations);
}

function buildSearchQueries(term, type) {
    let queries = [];
    let variations = generateVariations(term, type);
    
    let sites = [
        'github.com',
        'reddit.com',
        'twitter.com',
        'linkedin.com',
        'facebook.com',
        'instagram.com',
        'tiktok.com',
        'youtube.com',
        'stackoverflow.com'
    ];
    
    if (type === 'email') {
        queries.push({ query: term, source: 'Google' });
        queries.push({ query: `"${term}"`, source: 'Google' });
        sites.forEach(site => {
            queries.push({ query: `${term} site:${site}`, source: site });
        });
    }
    
    if (type === 'username') {
        variations.forEach(v => {
            queries.push({ query: `"${v}"`, source: 'Google' });
            sites.forEach(site => {
                queries.push({ query: `"${v}" site:${site}`, source: site });
            });
        });
    }
    
    if (type === 'phone') {
        variations.forEach(v => {
            queries.push({ query: v, source: 'Google' });
            queries.push({ query: `"${v}"`, source: 'Google' });
        });
    }
    
    if (type === 'name') {
        queries.push({ query: `"${term}"`, source: 'Google' });
        sites.forEach(site => {
            queries.push({ query: `"${term}" site:${site}`, source: site });
        });
    }
    
    return queries;
}

function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const searchType = document.getElementById('searchType').value;
    
    if (!searchInput) {
        showError('אנא הכנס ערך לחיפוש');
        return;
    }
    
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    document.getElementById('success').style.display = 'none';
    
    setTimeout(() => {
        try {
            const variations = generateVariations(searchInput, searchType);
            const queries = buildSearchQueries(searchInput, searchType);
            
            displayResults(searchInput, searchType, variations, queries);
            
            document.getElementById('loading').style.display = 'none';
            document.getElementById('results').style.display = 'block';
            
            showSuccess('חיפוש הושלם בהצלחה!');
            
        } catch(e) {
            document.getElementById('loading').style.display = 'none';
            showError('שגיאה בחיפוש: ' + e.message);
        }
    }, 1000);
}

function displayResults(searchInput, searchType, variations, queries) {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    
    displayVariations(variations);
    
    let html = '<div style="margin-top: 15px;">';
    
    const uniqueSites = [...new Set(queries.map(q => q.source))];
    
    uniqueSites.forEach(site => {
        const siteQueries = queries.filter(q => q.source === site);
        html += `
            <div class="result-item">
                <h3>🔗 ${site}</h3>
                <p><span class="result-label">${siteQueries.length} שאילתות</span></p>
                <p style="margin-top: 10px; color: #999; font-size: 0.9em;">
                    ${siteQueries.slice(0, 3).map(q => `"${q.query}"`).join(' / ')}
                    ${siteQueries.length > 3 ? '...' : ''}
                </p>
                <p style="margin-top: 10px;">
                    <a href="https://www.google.com/search?q=${encodeURIComponent(siteQueries[0].query)}" 
                       target="_blank" 
                       style="color: #667eea; text-decoration: none; font-weight: bold;">
                       🌐 חפש בGoogle →
                    </a>
                </p>
            </div>
        `;
    });
    
    html += '</div>';
    resultsList.innerHTML = html;
}

function displayVariations(variations) {
    const variationsList = document.getElementById('variationsList');
    variationsList.innerHTML = '';
    
    variations.forEach(v => {
        const div = document.createElement('div');
        div.className = 'variation-item';
        div.textContent = v;
        variationsList.appendChild(div);
    });
    
    document.getElementById('variations').style.display = 'block';
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function showSuccess(message) {
    const successDiv = document.getElementById('success');
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
