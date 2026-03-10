#!/bin/bash
# Memory Query Helper for prototype_x1000
# Usage: ./memory-query.sh <command> [args]

MEMORY_DIR="/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/prototype_x1000/memory"

case "$1" in
  search)
    # Search all memory for a term
    echo "🔍 Searching memory for: $2"
    grep -r -i "$2" "$MEMORY_DIR" --include="*.md" --include="*.json" 2>/dev/null
    ;;
  
  errors)
    # List all logged errors
    echo "❌ Logged Errors:"
    ls -la "$MEMORY_DIR/errors/"
    echo ""
    echo "Contents:"
    cat "$MEMORY_DIR/errors/"*.md 2>/dev/null || echo "No error logs found"
    ;;
  
  learnings)
    # List all learnings
    echo "📚 Learnings:"
    ls -la "$MEMORY_DIR/learnings/"
    echo ""
    echo "Contents:"
    cat "$MEMORY_DIR/learnings/"*.md 2>/dev/null || echo "No learnings found"
    ;;
  
  patterns)
    # List all patterns
    echo "🔄 Patterns:"
    ls -la "$MEMORY_DIR/patterns/"
    ;;
  
  decisions)
    # List all decisions
    echo "🎯 Decisions:"
    ls -la "$MEMORY_DIR/decisions/"
    echo ""
    cat "$MEMORY_DIR/decisions/"*.json 2>/dev/null || echo "No decisions found"
    ;;
  
  recent)
    # Show recent session logs
    echo "📅 Recent Sessions:"
    ls -lt "$MEMORY_DIR/sessions/" | head -10
    ;;
  
  solutions)
    # Show solutions
    echo "✅ Solutions:"
    ls -la "$MEMORY_DIR/solutions/"
    cat "$MEMORY_DIR/solutions/"*.md 2>/dev/null || echo "No solutions found"
    ;;
  
  collaborations)
    # Show brain collaborations
    echo "🤝 Brain Collaborations:"
    ls -la "$MEMORY_DIR/collaborations/"
    ;;
  
  summary)
    # Summary of all memory
    echo "📊 Memory Summary:"
    echo ""
    echo "Decisions:      $(ls -1 "$MEMORY_DIR/decisions/" 2>/dev/null | wc -l | tr -d ' ')"
    echo "Errors:         $(ls -1 "$MEMORY_DIR/errors/" 2>/dev/null | wc -l | tr -d ' ')"
    echo "Learnings:      $(ls -1 "$MEMORY_DIR/learnings/" 2>/dev/null | wc -l | tr -d ' ')"
    echo "Patterns:       $(ls -1 "$MEMORY_DIR/patterns/" 2>/dev/null | wc -l | tr -d ' ')"
    echo "Sessions:       $(ls -1 "$MEMORY_DIR/sessions/" 2>/dev/null | wc -l | tr -d ' ')"
    echo "Solutions:      $(ls -1 "$MEMORY_DIR/solutions/" 2>/dev/null | wc -l | tr -d ' ')"
    echo "Collaborations: $(ls -1 "$MEMORY_DIR/collaborations/" 2>/dev/null | wc -l | tr -d ' ')"
    ;;
  
  help|*)
    echo "Memory Query Helper"
    echo "==================="
    echo ""
    echo "Usage: ./memory-query.sh <command> [args]"
    echo ""
    echo "Commands:"
    echo "  search <term>   Search all memory for a term"
    echo "  errors          List all logged errors"
    echo "  learnings       List all learnings"
    echo "  patterns        List all patterns"
    echo "  decisions       List all decisions"
    echo "  recent          Show recent session logs"
    echo "  solutions       Show verified solutions"
    echo "  collaborations  Show brain collaborations"
    echo "  summary         Summary of all memory"
    echo "  help            Show this help"
    ;;
esac
